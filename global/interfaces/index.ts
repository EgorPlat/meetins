export type Post = {
    date: string,
    images: string[],
    description: string,
    title: string,
    likes: number,
    id: string,
}
export interface IOuterInvites {
    invitedUsers: IInvitedUsers[],
    eventId: string
}

export interface IInvitedUsers {
    userId: string,
    status: boolean,
    dateOfSending: string,
    avatar: string,
    name: string
}

export interface IInnerInvites {
    fromUserId: string,
    eventId: string,
    dateOfSending: string,
    status: boolean,
    avatar: string,
    name: string
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
    isOnline: boolean,
    interests: string[],
    innerInvites: IInnerInvites[]
    outerInvites: IOuterInvites[],
    tag: { color: string, title: string },
    purchasedOpportunities: number[]
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
    isRead: true,
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
    isRead: true,
    content: string,
    messages: IMyActiveDialogMessage[],
    status?: boolean,
    userId?: string
}
export interface SortedMessagesOnDays {
    data: string,
    messages: IMyActiveDialogMessage[]
}