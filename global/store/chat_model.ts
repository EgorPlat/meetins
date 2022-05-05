import { createEffect, createEvent, createStore } from "effector";
import { connection } from "./connection_model";
import { instance, User } from "./store";

export const setActiveChat = createEvent<IMyDialog>();
export const activeChat = createStore<IMyDialog>({} as IMyDialog).on(setActiveChat, (_, newActiveChat) => {
    return newActiveChat;
})
export const setMyDialogs = createEvent<IMyDialog[]>();
export const myDialogs = createStore<IMyDialog[] | null>(null).on(setMyDialogs, (_, newMyDialogs) => {
    return newMyDialogs;
})
 
export const sendMessageAndUploadActiveChat = createEffect((message: string) => {
    const actualActiveChat = activeChat.getState();
    const connection$ = connection.getState();
    if(actualActiveChat && connection$) {
        if(actualActiveChat.userId == undefined) {
            sendMessageInDialog(
                {dialogId: actualActiveChat.dialogId, content: message}
            ).then((response) => {
                setActiveChat({...actualActiveChat, messages: [...response?.data], content: message})
            })
        } else {
            startNewDialog({userId: actualActiveChat.userId, messageContent: message}).then((response) => {
                setActiveChat({
                    dialogId: response?.data[0].dialogId,
                    userName: actualActiveChat.userName,
                    userAvatar: actualActiveChat.userAvatar,
                    isRead: true,
                    content: message,
                    messages: response?.data,
                    status: true
                })
            });
            getMyDialogs();
        } 
    }
}); 


export const getMyDialogs = createEffect(async () => {
    try {
        const response = await instance.get('chat/my-dialogs');
        if(response.status === 200) {
            setMyDialogs(response.data);
            return response.data;
        }
    }  
    catch(error) {
        console.log(error);
    }
});

export const getDialogMessages = async (chosedDialog: IMyDialog) => {
    if(chosedDialog.dialogId !== '-') {
        try {
            const response = await instance.post('chat/messages', JSON.stringify({dialogId: chosedDialog.dialogId}) );
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
}
export const sendMessageInDialog = async (message: IDialogMessage) => {
    try {
        const response = await instance.post('chat/send-message', message);
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
        const response = await instance.post('chat/start-dialog', newDialog);
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
    messages: IMyActiveDialogMessage[],
    status?: boolean,
    userId?: string
}