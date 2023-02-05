export type Post = {
    date: string,
    images: string[],
    description: string,
    title: string,
    likes: number,
    id: string,
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
    interests: string[]
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
    isFile?: boolean
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