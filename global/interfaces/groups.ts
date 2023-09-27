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

export interface IGroupPost {
    id: string;
    title: string;
    file: {
        src: string;
        type: string;
    } | null;
    date: string;
    description: string;
    likes: number;
    views: number
}