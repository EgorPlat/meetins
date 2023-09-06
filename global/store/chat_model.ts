import { attach, createEffect, createEvent, createStore, sample } from "effector";
import { IDialogMessage, IMyDialog, INewDialog, User } from "../interfaces";
import { defaultDialog } from "../mock/defaultDialog";
import { $user, instance } from "./store";

export const setActiveChat = createEvent<IMyDialog>();
export const activeChat = createStore<IMyDialog>(defaultDialog).on(setActiveChat, (_, newActiveChat) => {
    return newActiveChat;
})
export const setMyDialogs = createEvent<IMyDialog[]>();
export const myDialogs = createStore<IMyDialog[] | null>(null).on(setMyDialogs, (_, newMyDialogs) => {
    return newMyDialogs;
})
const handleIsUserUnReadMessagesExists = createEffect(( params: { myDialogs: IMyDialog[], authedUser: User }) => {
    let isUnReadMessagesExists = false;
    params.myDialogs.map(dialog => {
        dialog.messages.map(message => {
            if (!message.isRead && params.authedUser.userId !== message.senderId) {
                isUnReadMessagesExists = true;
                return;
            }   
        })
    })
    setIsUserUnReadMessagesExists(isUnReadMessagesExists);
})
sample({
    source: { myDialogs: myDialogs, authedUser: $user },
    target: handleIsUserUnReadMessagesExists
})

export const setIsUserUnReadMessagesExists = createEvent<boolean>();
export const isUserUnReadMessagesExists = createStore<boolean>(false).on(setIsUserUnReadMessagesExists, (_, status) => {
    return status;
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
                if (res.status <= 217) {
                    setActiveChat({...actualActiveChat, messages: [...actualActiveChat.messages, res.data], content: res.data.content});
                }
                setIsMessageWithFileLoaded(true);
            })
        }
    }
})
export const sendMessageAndUploadActiveChat = createEffect((params: { message: string, dataStore: {activeChat: IMyDialog} }) => {
    const actualActiveChat = params.dataStore.activeChat;
    if(actualActiveChat) {
        if(actualActiveChat.dialogId !== 'none') {
            sendMessageInDialog(
                {dialogId: actualActiveChat.dialogId, content: params.message}
            ).then((response) => {
                setActiveChat({...actualActiveChat, messages: [...actualActiveChat.messages, response?.data], content: params.message});
            })
        } else {
            startNewDialog({userId: actualActiveChat.userId, messageContent: params.message}).then((response) => {
                setActiveChat({
                    dialogId: response?.data.dialogId,
                    userName: actualActiveChat.userName,
                    userAvatar: actualActiveChat.userAvatar,
                    isRead: true,
                    content: params.message,
                    messages: [response?.data],
                    status: true
                });
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
        if (isFirstGetDialogs) setIsMyDialogsLoaded(true);
        return response;
    }  
    catch(error) {
        console.log(error);
    }
});

export const checkDialog = createEffect(async (user: User) => {
    try {
        const response = await instance.post('chat/check-dialog', {userId: user.userId});
        if(response.status === 200) {
            setActiveChat({
                ...defaultDialog, 
                dialogId: response.data[0].dialogId, 
                userAvatar: user.avatar, 
                userName: user.name,
                messages: response.data[0].messages 
            });
            return response;
        } else {
            setActiveChat({...defaultDialog, userName: user.name, userAvatar: user.avatar, userId: user.userId, dialogId: "none"});
        }
    }  
    catch(error) {
        console.log(error);
    }
});


export const getDialogMessages = createEffect(async (chosedDialog: IMyDialog) => {
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
})

export const updatedIsReadMessagesInActiveDialog = createEffect(async (dialogId: string) => {
    try {
        const response = await instance.post('chat/mark-messages-as-readed', { dialogId: dialogId });
        return response;
    } catch(error) {
        console.log(error);
    }
})
export const sendFileInDialog = createEffect(async (message: FormData) => {
    const response = await instance.post('chat/send-file-to-chat', message);
    return response;
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

sample({
	clock: getDialogMessages.doneData,
	filter: response => response.status === 200,
	fn: response => response.data[0].dialogId,
	target: updatedIsReadMessagesInActiveDialog
})
sample({
	clock: updatedIsReadMessagesInActiveDialog.doneData,
	filter: response => response.status === 200,
	fn: response => false,
	target: getMyDialogs
})
sample({
	clock: getMyDialogs.doneData,
	filter: response => response.status === 200,
	fn: response => response.data,
	target: setMyDialogs
})
