export type Post = {
    date: string,
    files: {
        src: string,
        type: string
    }[],
    description: string,
    title: string,
    likes: string[],
    id: string,
}
export interface IOuterInvites {
    invitedUsers: IInvitedUsers[],
    eventId: string
}

export interface IInvitedUsers {
    avatar: string,
    name: string,
    login: number
}

export interface IInnerInvites {
    fromUserId: string,
    eventId: string,
    dateOfSending: string,
    status: boolean,
    avatar: string,
    name: string,
    login: number
}

export type User = {
	userId: string
	name: string,
	phoneNumber: string,
	email: string,
	status: string,
	gender: string,
	avatar: string,
	dateRegister: string,
	login: string,
	birthDate: string,
	city: string,
    age: number,
    events: string[],
    posts: Post[],
    isFilter: boolean,
    isOnline: boolean,
    markedUsers: string[],
    interests: string[],
    innerInvites: IInnerInvites[]
    outerInvites: IOuterInvites[],
    tag: IUserTag,
    purchasedOpportunities: number[]
}

export interface IUserTag { 
    color: string, 
    title: string 
}

export type IMarkedUserInfo = {
	name: string,
	avatar: string,
	login: number,
    userId: string
}

export type ProfileData = {
	name: string,
	phoneNumber: string,
	birthDate: string
}
export type AccountData = {
	email: string,
	password: string,
	login: string
}
export interface IPeople {
    email: string,
    login: string,
    userName: string,
    userAvatar: string,
    status: string,
    age: 0,
    city: string,
    gender: string,
}
export interface Params {
    gender: string,
    age: number,
    event: number
}
export interface IParams {
    gender?: string,
    age?: number,
    goal?: string,
    events?: string[],
    interests?: string[],
}
export interface INewDialog {
    userId: string,
    messageContent: string
}
export interface IDialogMessage {
    dialogId: string,
    content: string
}
export interface IMyActiveDialogMessage {
    dialogId: string,
    content: string,
    messageId: string,
    sendAt: string,
    senderId: string,
    isRead: boolean,
    avatar: string,
    senderName: string,
    status?: boolean,
    isMine: boolean,
    type: string
}
export interface IMyDialog {
    dialogId: string,
    userName: string,
    userAvatar: string,
    isRead: boolean,
    content: string,
    messages: IMyActiveDialogMessage[],
    userLogin?: number,
    status?: boolean,
    userId?: string
}
export interface SortedMessagesOnDays {
    data: string,
    messages: IMyActiveDialogMessage[]
}
export interface IOnlineUser {
    email: string,
    userId: string,
    sockedId: string
}