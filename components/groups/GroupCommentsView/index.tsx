
import { IGroup } from "@/entities/groups";
import AddCommentIntoGroupPost from "@/features/forms/AddCommentIntoGroupPost/Index";
import { baseURL } from "@/global/store/store";
import s from "./groupCommentsView.module.scss";

export default function GroupCommentsView(props: {
    groupInfo: IGroup,
    activePostId: number
}) {

    const comments = props.groupInfo?.posts?.filter(post => post.id === props.activePostId)[0]?.comments;

    if (comments) {
        return (
            <div className={s.groupComments}>
                {
                    comments.map(el => (
                        <div className={s.comment} key={el.text}>
                            <div className={s.avatar}>
                                <img src={baseURL + el.avatar} className={s.image} />
                            </div>
                            <div className={s.info}>
                                <div className={s.name}>
                                    {el.userId}
                                </div>
                                <div className={s.text}>
                                    {el.text}
                                </div>
                            </div>
                        </div>
                    ))
                }
                <AddCommentIntoGroupPost
                    postId={props.activePostId}
                />
            </div>
        )
    } else {
        return null;
    }
}