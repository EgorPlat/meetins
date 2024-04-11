export interface IGroup {
    groupId: number;
    name: string;
    description: string;
    mainAvatar: string;
    headAvatar: string | null;
    membersId: string[];
    creatorId: string;
    posts: IGroupPost[];
    talks: IGroupTalk[],
    photos: string[],
    video: string[],
    attachments: string[],
    interestsId: string[]
}

export interface IGroupMembersInfo {
    name: string,
    avatar: string,
    login: number
}

export interface IManageGroup {
    name: string, 
    headImage: File,
    description: string,
    groupId: number
}

export interface IGroupPostComment {
    userId: string,
    avatar: string,
    text: string,
    date: Date
}
export interface IGroupPost {
    id: number,
    title: string,
    files: IGroupFile[],
    date: number,
    description: string,
    likes: string[],
    views: number,
    comments: IGroupPostComment[]
}
export interface EnchancedFiles {
    audio?: IGroupFile[],
    video?: IGroupFile[],
    image?: IGroupFile[]
}

export interface IGroupPostEnchancedFiles {
    id: number,
    title: string,
    date: number,
    description: string,
    likes: number,
    views: number,
    comments: IGroupPostComment[]
    files: EnchancedFiles
}

export interface IGroupFile {
    src: string,
    type: string
}

export interface IGroupTalkMessage {
    userId: string,
    date: Date,
    text: string
}
export interface IGroupTalk {
    id: number,
    title: string,
    dateOfCreation: Date,
    messages: IGroupTalkMessage[]
}

export interface ICreateGroup {
    name: string,
    description: string,
    interestsId: string[]
}