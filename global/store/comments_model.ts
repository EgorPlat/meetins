import { createEffect, createEvent, createStore, sample } from "effector";
import { PostComment } from "../interfaces/comment";
import { NewComment } from "../interfaces/newComment";
import { instance } from "./store";

export const setCurrentPostComments = createEvent<PostComment[]>();
export const currentPostComments = createStore<PostComment[]>([]).on(setCurrentPostComments, (_, currentComments) => {
	return currentComments;
});

export const addNewCommentToCurrentPost = createEffect(async (data: NewComment) => {
    const response = await instance.post('posts/add-new-comment', data);
    return response.data;
});

export const getCurrentPostsComments = createEffect(async (postId: string) => {
	const response = await instance.post('posts/get-all-comments', { postId: postId });
    if (response.data) {
        setCurrentPostComments(response.data);
    }
});
