import { createEffect, createEvent, createStore, sample } from "effector";
import { PostComment } from "../interfaces/comment";
import { NewComment } from "../interfaces/newComment";
import { instance } from "./store";

export const setCurrentPostComments = createEvent<PostComment[]>();
export const addCurrentPostComment = createEvent<PostComment>();
export const currentPostComments = createStore<PostComment[]>([]).on(setCurrentPostComments, (_, currentComments) => {
	return currentComments;
});
currentPostComments.on(addCurrentPostComment, (comments, newComment) => {
    return [...comments, newComment];
});

export const setIsCurrentPostCommentsLoaded = createEvent<boolean>();
export const isCurrentPostCommentsLoaded = createStore<boolean>(false).on(setIsCurrentPostCommentsLoaded, (_, newStatus) => {
	return newStatus;
});

export const addNewCommentToCurrentPost = createEffect(async (data: NewComment) => {
    const response = await instance.post('posts/add-new-comment', data);
    addCurrentPostComment(response.data);
});

export const getCurrentPostsComments = createEffect(async (postId: string) => {
    setIsCurrentPostCommentsLoaded(false);
	const response = await instance.post('posts/get-all-comments', { postId: postId });
    if (response.data) {
        setCurrentPostComments(response.data);
        setIsCurrentPostCommentsLoaded(true);
    }
});
