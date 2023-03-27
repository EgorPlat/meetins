import { attach, createEffect, createEvent, createStore, sample } from "effector";
import { IDialogMessage, IMyDialog, INewDialog, User } from "../interfaces";
import { defaultDialog } from "../mock/defaultDialog";
import { $user, instance } from "./store";

export const setActiveChat = createEvent<IMyDialog>();
export const activeChat = createStore<IMyDialog>({} as IMyDialog).on(setActiveChat, (_, newActiveChat) => {
    return newActiveChat;
})
export const setMyDialogs = createEvent<IMyDialog[]>();
export const myDialogs = createStore<IMyDialog[] | null>(null).on(setMyDialogs, (_, newMyDialogs) => {
    return newMyDialogs;
})
const myDialogsWatcher = createEffect(( params: { myDialogs: IMyDialog[], authedUser: User, activeChat: IMyDialog }) => {
    const count = params.myDialogs.reduce((prev, curr) => {
        let dialogUnReadMessages = 0;
        curr.messages.map(message => {
            if (!message.isRead && params.authedUser.userId !== message.senderId) {
                dialogUnReadMessages += 1;
            }
        })
        return prev += dialogUnReadMessages;
    }, 0);
    
    if (count) setCountUreadMessages(count);
    if (!count) setCountUreadMessages(0);
})
sample({
    source: { myDialogs: myDialogs, authedUser: $user, activeChat: activeChat },
    target: myDialogsWatcher
})

export const setCountUreadMessages = createEvent<number>();
export const addOneUreadMessages = createEvent<number>();
export const countUreadMessages = createStore<number>(0).on(setCountUreadMessages, (_, newCount) => {
    return newCount;
})
countUreadMessages.on(addOneUreadMessages, (count, newCount) => {
    return count += newCount;
})

export const setIsMyDialogsLoaded = createEvent<boolean>();
export const isMyDialogsLoaded = createStore<boolean>(false).on(setIsMyDialogsLoaded, (_, newMyDialogs) => {
    return newMyDialogs;
})
export const setIsMessageWithFileLoaded = createEvent<boolean>();
export const isMessageWithFileLoaded = createStore<boolean>(true).on(setIsMessageWithFileLoaded, (_, isMessageLoaded) => {
    return isMessageLoaded;
})

export const sendFileAndUploadActiveChat = createEffect((params: { file: any, dataStore: {activeChat: IMyDialog } }) => {
    setIsMessageWithFileLoaded(false);
    const actualActiveChat = params.dataStore.activeChat;
    if(actualActiveChat) {
        if(actualActiveChat.userId == undefined) {
            const file = params.file;
            const formData = new FormData();
            formData.append('uploadedFile', file);
            formData.append('dialogId', actualActiveChat.dialogId);

            sendFileInDialog(
                formData
            ).then(res => {
                if (res.data) {
                    setActiveChat({...actualActiveChat, messages: [...res.data], content: res.data[res.data.length - 1]});
                }
                setIsMessageWithFileLoaded(true);
            })
        }
    }
})
export const sendMessageAndUploadActiveChat = createEffect((params: { message: string, dataStore: {activeChat: IMyDialog} }) => {
    const actualActiveChat = params.dataStore.activeChat;
    if(actualActiveChat) {
        if(actualActiveChat.dialogId) {
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
            });
        }
        getMyDialogs(false);
    }
}); 
export const createdSendMessageAndUploadActiveChat = attach({
    effect: sendMessageAndUploadActiveChat,
    source: {activeChat: activeChat},
    mapParams: (message: string, dataStore) => {
      return {message: message, dataStore: dataStore}
    },
  })

export const createdSendFileAndUploadActiveChat = attach({
    effect: sendFileAndUploadActiveChat,
    source: {activeChat: activeChat},
    mapParams: (file: any, dataStore) => {
      return {file: file, dataStore: dataStore}
    },
  })





export const getMyDialogs = createEffect(async (isFirstGetDialogs: boolean) => {
    if (isFirstGetDialogs) setIsMyDialogsLoaded(false);
    try {
        const response = await instance.get('chat/my-dialogs');
        if(response.status === 200) {
            setMyDialogs(response.data);
            if (isFirstGetDialogs) setIsMyDialogsLoaded(true);
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

export const updatedIsReadMessagesInActiveDialog = createEffect(async (dialogId: string) => {
    try {
        const response = await instance.post('chat/mark-messages-as-readed', { dialogId: dialogId });
        if(response.status === 200) {
            getMyDialogs(false);
            return response;
        }
    } catch(error) {
        console.log(error);
    }
})
export const sendFileInDialog = createEffect(async (message: FormData) => {
    try {
        const response = await instance.post('chat/send-file-to-chat', message);
        if(response.status === 200) {
            return response;
        }
    }
    catch(error) {
        console.log(error);
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