import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '../../../../components/Loader/Loader';
import { customizeDateToYYYYMMDDFormat } from '../../../../global/helpers/helper';
import { Post } from '../../../../global/interfaces';
import { PostComment } from '../../../../global/interfaces/comment';
import { currentPostComments, getCurrentPostsComments, isCurrentPostCommentsLoaded } from '../../../../global/store/comments_model';
import { baseURL } from '../../../../global/store/store';
import s from './CurrentPostComments.module.scss';

export default function CurrentPostComments (props: {post: Post}) {

    const currentPostComments$ = useStore(currentPostComments);
    const isCurrentPostCommentsLoaded$ = useStore(isCurrentPostCommentsLoaded);
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
        return <Loader />
    }
    return (
        <div className={s.commentsList}>
            {currentPostComments$.map(comment => (
                <div className={s.comment} onClick={() => handleCommentAvatarClick(comment)}>
                    <div className={s.commentAvatar}>
                        <img src = {baseURL + comment.commentOwnerAvatar} />
                    </div>
                    <div className={s.commentContent}>
                        <div className={s.commentTitle}>
                            {comment.commentOwnerName}-
                            <span className={s.commentDate}>{customizeDateToYYYYMMDDFormat(comment.date)}</span>
                        </div>
                        <div className={s.commentText}>
                            {comment.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}