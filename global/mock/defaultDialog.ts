import { IMyDialog } from "../../entities";

export const defaultDialog: IMyDialog = {
    dialogId: "none", 
    userName: "",
    userAvatar: "",
    isRead: true,
    content: "Сообщение",
    messages: [],
    status: true,
    userId: undefined
}