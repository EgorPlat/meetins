import { createEffect, createEvent, createStore, sample } from "effector";
import { Socket } from "socket.io-client";
import { IMyDialog } from "../interfaces";
import { activeChat, addOneUreadMessages, getDialogMessages } from "./chat_model";
import { setOnlineUsers } from "./store";

export const setNewConnection = createEvent<Socket>();
export const connection = createStore<Socket | null>(null).on(
    setNewConnection,
    (_, newConnection) => {
        return newConnection
    }
);
export const connectionWatcher = createEffect((obj: {connection: Socket | null, activeChat: IMyDialog}) => {
    obj.connection?.removeAllListeners();
    obj.connection?.on('message', (message: any) => {
        if(message.dialogId === obj.activeChat.dialogId) {
            getDialogMessages({...obj.activeChat, dialogId: message.dialogId});
        } else {
            addOneUreadMessages(1);
        }
    });
    obj.connection?.on('updateUsers', (message: any) => {
        setOnlineUsers(message.users);
    });
    obj.connection?.on('connect', () => {
        console.log('connect');
    });
})
sample({
    source: {connection: connection, activeChat: activeChat},
    target: connectionWatcher
})