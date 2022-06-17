import { attach, createEffect, createEvent, createStore, sample } from "effector";
import { IDialogMessage, IMyDialog, INewDialog, User } from "../interfaces";
import { defaultDialog } from "../mock/defaultDialog";
import { instance } from "./store";

export const setActiveChat = createEvent<IMyDialog>();
export const activeChat = createStore<IMyDialog>({} as IMyDialog).on(setActiveChat, (_, newActiveChat) => {
    return newActiveChat;
})
export const setMyDialogs = createEvent<IMyDialog[]>();
export const myDialogs = createStore<IMyDialog[] | null>(null).on(setMyDialogs, (_, newMyDialogs) => {
    return newMyDialogs;
})
 
export const sendMessageAndUploadActiveChat = createEffect((params: {message: string, dataStore: 
    {activeChat: IMyDialog}
}) => {
    const actualActiveChat = params.dataStore.activeChat;
    if(actualActiveChat) {
        if(actualActiveChat.userId == undefined) {
            sendMessageInDialog(
                {dialogId: actualActiveChat.dialogId, content: params.message}
            ).then((response) => {
                setActiveChat({...actualActiveChat, messages: [...response?.data], content: params.message});
            })
        } else {
            startNewDialog({userId: actualActiveChat.userId, messageContent: params.message}).then((response) => {
                setActiveChat({
                    dialogId: response?.data[0].dialogId,
                    userName: actualActiveChat.userName,
                    userAvatar: actualActiveChat.userAvatar,
                    isRead: true,
                    content: params.message,
                    messages: response?.data,
                    status: true
                });
                getMyDialogs();
            });
        }
    }
}); 
export const createdSendMessageAndUploadActiveChat = attach({
    effect: sendMessageAndUploadActiveChat,
    source: {activeChat: activeChat},
    mapParams: (message: string, dataStore) => {
      return {message: message, dataStore: dataStore}
    },
  })

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

export const checkDialog = createEffect(async (user: User) => {
    try {
        const response = await instance.post('chat/check-dialog', {userId: user.userId});
        if(response.status === 200) {
            setActiveChat({...defaultDialog, dialogId: response.data[0].dialogId, userAvatar: user.avatar, userName: user.name});
            return response;
        } else {
            setActiveChat({...defaultDialog, userName: user.name, userAvatar: user.avatar, userId: user.userId});
        }
    }  
    catch(error) {
        console.log(error);
    }
});


export const getDialogMessages = createEffect(async (chosedDialog: IMyDialog) => {
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
})
export const sendMessageInDialog = createEffect(async (message: IDialogMessage) => {
    try {
        const response = await instance.post('chat/send-message', message);
        if(response.status === 200) {
            return response;
        }
    }
    catch(error) {
        console.log(error);
    }
})
export const startNewDialog = createEffect(async (newDialog: INewDialog) => {
    try {
        const response = await instance.post('chat/start-dialog', newDialog);
        if(response.status === 200) {
            return response;
        }
    }
    catch(error) {
        console.log(error);
    }
})