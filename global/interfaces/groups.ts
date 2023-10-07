export interface IGroup {
    groupId: number;
    name: string;
    description: string;
    mainAvatar: string;
    headAvatar: string | null;
    membersId: string[];
    creatorId: string;
    posts: IGroupPost[];
}

export interface IGroupMembersInfo {
    name: string,
    avatar: string,
    login: number
}

export interface IGroupPostComment {
    userId: string,
    userAvatar: string,
    text: string,
    date: Date
}
export interface IGroupPost {
    id: number,
    title: string,
    files: IGroupFile[],
    date: number,
    description: string,
    likes: number,
    views: number,
    comments: IGroupPostComment[]
}
export interface IGroupFile {
    src: string,
    type: string
}