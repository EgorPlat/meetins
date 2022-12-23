import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { Post } from '../../../../global/interfaces';
import { currentPostComments, getCurrentPostsComments } from '../../../../global/store/comments_model';
import { baseURL } from '../../../../global/store/store';
import s from './CurrentPostComments.module.scss';

export default function CurrentPostComments (props: {post: Post}) {

    const currentPostComments$ = useStore(currentPostComments);

    useEffect(() => {
        getCurrentPostsComments(props.post.id);
    }, []);

    if (!props.post) {
        return null;
    }
    return (
        <div className={s.commentsList}>
            {currentPostComments$.map(comment => (
                <div className={s.comment}>
                    <div className={s.commentAvatar}>
                        <img src = {baseURL + comment.commentOwnerAvatar} />
                    </div>
                    <div className={s.commentContent}>
                        <div className={s.commentTitle}>{comment.commentOwnerName}</div>
                        <div className={s.commentText}>
                            {comment.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}