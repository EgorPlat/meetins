export interface PostComment {
    text: string,
    commentId: string,
    commentOwnerId: string,
    postId: string,
    postOwnerId: string,
    commentOwnerAvatar: string,
    commentOwnerName: string,
    commentOwnerLogin: number,
    date: string
}