import { createEffect, createEvent, createStore } from "effector";
import { instance } from "./store";

export const setActiveChat = createEvent<IMyDialog | null>();
export const activeChat = createStore<IMyDialog | null>(null).on(setActiveChat, (_, newActiveChat) => {
    return newActiveChat;
})
export const setMyDialogs = createEvent<IMyDialog[]>();
export const myDialogs = createStore<IMyDialog[] | null>(null).on(setMyDialogs, (_, newMyDialogs) => {
    return newMyDialogs;
})

export const getMyDialogs = async () => {
    try {
        const response = await instance.get('/dialogs/my-dialogs');
        if(response.status === 200) {
            setMyDialogs(response.data);
            return response;
        }
    } 
    catch(error) {
        console.log(error);
    }
}
export const getDialogMessages = async (chosedDialog: IMyDialog) => {
    try {
        const response = await instance.post('/dialogs/messages', chosedDialog.dialogId);
        if(response.status === 200) {
            const activeDialogWithMessages: IMyDialog = {...chosedDialog, messages: response.data};
            setActiveChat(activeDialogWithMessages);
            return response;
        }
    }
    catch(error) {
        console.log(error);
    }
}
export const sendMessageInDialog = async (message: IDialogMessage) => {
    try {
        const response = await instance.post('/dialogs/send-message', message);
        if(response.status === 200) {
            return response;
        }
    }
    catch(error) {
        console.log(error);
    }
}
export const startNewDialog = async (newDialog: INewDialog) => {
    try {
        const response = await instance.post('/dialogs/start-dialog', newDialog);
        if(response.status === 200) {
            return response;
        }
    }
    catch(error) {
        console.log(error);
    }
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
    isMine: boolean
}
export interface IMyDialog {
    dialogId: string,
    userName: string,
    userAvatar: string,
    isRead: true,
    content: string,
    messages?: IMyActiveDialogMessage[],
    status?: boolean
}