import { useUnit } from "effector-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { customizeDateToYYYYMMDDFormat } from "../../../../shared/functions/getDateInYYYYMMDDFormat";
import { Post } from "../../../../entities";
import { PostComment } from "../../../../entities/comment";
import { currentPostComments, getCurrentPostsComments, isCurrentPostCommentsLoaded } from "../../../../global/store/comments_model";
import { baseURL } from "../../../../global/store/store";
import s from "./CurrentPostComments.module.scss";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";

export default function CurrentPostComments (props: {post: Post}) {

    const currentPostComments$ = useUnit(currentPostComments);
    const isCurrentPostCommentsLoaded$ = useUnit(isCurrentPostCommentsLoaded);
    const router = useRouter();
    
    const handleCommentAvatarClick = (comment: PostComment) => {
        router.push(`/profile/${comment.commentOwnerLogin}`);
    }
    useEffect(() => {
        getCurrentPostsComments(props.post.id);
    }, []);

    if (!props.post) {
        return null;
    }
    if (!isCurrentPostCommentsLoaded$) {
        return <CustomLoader />
    }
    return (
        <div className={s.commentsList}>
            {
                currentPostComments$.length === 0 && <div className={s.noComments}>Комментариев пока нет</div>
            }
            {
                currentPostComments$.map(comment => (
                    <div className={s.comment} onClick={() => handleCommentAvatarClick(comment)} key={comment.commentId} >
                        <div className={s.commentAvatar}>
                            <img src = {baseURL + comment.commentOwnerAvatar} />
                        </div>
                        <div className={s.commentContent}>
                            <div className={s.commentTitle}>
                                <span className={s.commentOwnerName}>{comment.commentOwnerName}</span>
                                <span className={s.commentDate}>{customizeDateToYYYYMMDDFormat(comment.date)}</span>
                            </div>
                            <div className={s.commentText}>
                                {comment.text}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}