import { attach, createEffect, createEvent, createStore, forward, sample } from "effector";
import { Socket } from "socket.io-client";
import { IMyDialog } from "../interfaces";
import { activeChat, getDialogMessages } from "./chat_model";
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
        }
    });
    obj.connection?.on('updateUsers', (message: any) => {
        setOnlineUsers(message.users);
    });
    obj.connection?.on('onConnection', (message: string) => {
        console.log(message);
    });
})
sample({
    source: {connection: connection, activeChat: activeChat},
    target: connectionWatcher
})