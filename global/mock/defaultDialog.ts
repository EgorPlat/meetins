import { IMyDialog } from "../../entities";

export const defaultDialog: IMyDialog = {
    dialogId: null, 
    userName: "",
    userAvatar: "",
    isRead: true,
    content: "Сообщение",
    messages: [],
    status: true,
    userId: undefined
}