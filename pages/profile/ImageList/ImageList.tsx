import React, { useState } from "react";
import s from "./ImageList.module.scss";
import { Post, User } from "../../../global/interfaces";
import { baseURL } from "../../../global/store/store";
import CurrentPostComments  from "./CurrentPostComments/CurrentPostComments";
import PostCommentForm from "./PostCommentForm/PostCommentForm";
import { NewComment } from "../../../global/interfaces/newComment";
import { addNewCommentToCurrentPost } from "../../../global/store/comments_model";
import { customizeDateToYYYYMMDDFormat } from "../../../global/helpers/helper";
import { useTranslation } from "react-i18next";
import CustomModal from "../../../components-ui/CustomModal/CustomModal";
import { AiOutlineEye, AiOutlineLike } from "react-icons/ai";
import { FaComments } from 'react-icons/fa';
import { CgCalendarDates } from "react-icons/cg";

export default function ImageList(props: {currentUser: User, authedUser: User}): JSX.Element {

    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const { t } = useTranslation();
    
    const handleComments = (el: Post) => {
      setCurrentPost(el);
      setIsCommentsOpen(true);
    }
    const handleModalAction = (status: boolean) => {
      if (status) setIsCommentsOpen(!status);
      if (!status) setIsCommentsOpen(status);
    }
    const handleSubmitComment = (commentText: string) => {
      const newComment: NewComment = {
        text: commentText,
        postOwnerId: props.currentUser.userId,
        postId: currentPost.id,
        commentOwnerId: props.authedUser.userId
      };
      addNewCommentToCurrentPost(newComment);
    }
    return(
        <div className={s.postsList}>
            {
              props.currentUser?.posts?.map(el => {
                return (
                  <div className={`${s.post} ${s.block}`} key={el.title}>
                    <div className={s.postTitle}>
                      {el.title} 
                      <span className={s.date}>
                        <CgCalendarDates
                          fontSize={24}
                        />
                        {customizeDateToYYYYMMDDFormat(el.date)}
                      </span>
                    </div>
                    <div className={s.postImage}>
                      <img src={baseURL + el.images[0]} />
                    </div>
                    <div className={s.postDescription}>
                      Описание: {el.description}
                    </div>
                    <div className={s.postActions}>
                      <div className={s.postActionsLikes}>
                        <AiOutlineLike />
                        <span>{el.likes + 120}</span>
                      </div>
                      <div className={s.postActionsComments} onClick={() => handleComments(el)}>
                        <FaComments />
                        <span>Комментарии</span>
                      </div>
                      <div className={s.postActionsViews}>
                        <AiOutlineEye />
                        <span className={s.postActionsViewsCount}>189</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            { isCommentsOpen &&
              <CustomModal
                isDisplay={isCommentsOpen} 
                changeModal={handleModalAction}
                actionConfirmed={handleModalAction}
                title={`${t('Комментарии к ')} - ${currentPost.title}`}
                typeOfActions="custom"
                actionsComponent={
                 <PostCommentForm onSubmitComment={handleSubmitComment}/>
                }
              >
                <div className={s.commentsModalContent}>
                  <CurrentPostComments post={currentPost} />
                </div>
              </CustomModal>
            }
        </div>
    )
}