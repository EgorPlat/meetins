import { createEffect, createEvent, createStore, sample } from "effector";
import { Socket } from "socket.io-client";
import { IDialogMessage, IMyActiveDialogMessage, IMyDialog } from "../interfaces";
import { activeChat, addOneUreadMessages, getDialogMessages, getMyDialogs, setActiveChat, updatedIsReadMessagesInActiveDialog } from "./chat_model";
import { setOnlineUsers } from "./store";

export const setNewConnection = createEvent<Socket>();
export const connection = createStore<Socket | null>(null).on(
    setNewConnection,
    (_, newConnection) => {
        return newConnection
    }
);
export const connectionWatcher = createEffect((obj: {connection: Socket, activeChat: IMyDialog}) => {
    obj.connection.removeAllListeners();
    obj.connection.on('message', (message: any) => {
        if(message.dialogId === obj.activeChat.dialogId) {
            if (obj.activeChat.userName === message.senderName) {
                setActiveChat({
                    ...obj.activeChat,
                    messages: [...obj.activeChat.messages, message]
                });
                updatedIsReadMessagesInActiveDialog(message.dialogId);
            }
        } else {
            addOneUreadMessages(1);
        }
    });
    obj.connection.on('updateUsers', (message: any) => {
        setOnlineUsers(message.users);
    });
    obj.connection.on('connect', () => {
        console.log('connect');
    });
})
sample({
    source: {connection: connection, activeChat: activeChat},
    target: connectionWatcher
})