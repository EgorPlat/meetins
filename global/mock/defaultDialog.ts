import { IMyDialog } from "../interfaces";

export const defaultDialog: IMyDialog = {
    dialogId: '-', 
    userName: '',
    userAvatar: '',
    isRead: true,
    content: 'Сообщение',
    messages: [],
    status: true,
    userId: undefined
}