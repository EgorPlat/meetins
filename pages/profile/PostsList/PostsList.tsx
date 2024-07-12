import React, { useState } from "react";
import s from "./PostsList.module.scss";
import { Post, User } from "../../../global/interfaces";
import { baseURL, likeUserPost, unlikeUserPost } from "../../../global/store/store";
import { NewComment } from "../../../global/interfaces/newComment";
import { addNewCommentToCurrentPost } from "../../../global/store/comments_model";
import { customizeDateToYYYYMMDDHHMMFormat } from "../../../global/helpers/helper";
import { useTranslation } from "react-i18next";
import { AiFillHeart, AiOutlineEye } from "react-icons/ai";
import { FaComments } from 'react-icons/fa';
import { CgCalendarDates } from "react-icons/cg";
import CurrentPostComments  from "./CurrentPostComments/CurrentPostComments";
import PostCommentForm from "./PostCommentForm/PostCommentForm";
import CustomModal from "../../../components-ui/CustomModal/CustomModal";
import CustomSlider from "../../../components-ui/CustomSlider/CustomSlider";

export default function PostsList(props: {currentUser: User, authedUser: User}): JSX.Element {

    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const { t } = useTranslation();
    
    const handleComments = (el: Post) => {
      setCurrentPost(el);
      setIsCommentsOpen(true);
    };

    const handleModalAction = (status: boolean) => {
      if (status) setIsCommentsOpen(!status);
      if (!status) setIsCommentsOpen(status);
    };

    const handleSubmitComment = (commentText: string) => {
      const newComment: NewComment = {
        text: commentText,
        postOwnerId: props.currentUser.userId,
        postId: currentPost.id,
        commentOwnerId: props.authedUser.userId
      };
      addNewCommentToCurrentPost(newComment);
    };

    const handleLikeUserPost = (post: Post) => {
      if (post.likes.includes(props.authedUser.userId)) {
        unlikeUserPost({ userId: props.currentUser.userId, postId: post.id });
      } else {
        likeUserPost({ userId: props.currentUser.userId, postId: post.id });
      }
    };

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
                        {customizeDateToYYYYMMDDHHMMFormat(el.date)}
                      </span>
                    </div>
                    <div className={s.postFiles}>
                      {/*<img src={baseURL + el.files[0].src} />*/}
                      {
                        el.files?.length > 0 &&
                          <CustomSlider 
                            files={
                              el.files.map(el => {
                                return {
                                  ...el,
                                  src: baseURL + el.src
                                }
                              })
                            } 
                            width='450px' 
                            height='300px' 
                          />
                      }
                    </div>
                    <div className={s.postDescription}>
                      <pre>{el.description}</pre>
                    </div>
                    <div className={s.postActions}>
                      <div className={s.postActionsLikes}>
                        <AiFillHeart 
                          color={el.likes.includes(props.authedUser.userId) ? 'red' : undefined}
                          onClick={() => handleLikeUserPost(el)}
                        />
                        <span>{el.likes.length}</span>
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