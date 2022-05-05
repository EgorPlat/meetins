import { createEvent, createStore } from "effector";
import { Socket } from "socket.io-client";
import { activeChat, getDialogMessages } from "./chat_model";

export const setNewConnection = createEvent<Socket>();
export const connection = createStore<Socket | null>(null).on(
    setNewConnection,
    (_, newConnection) => {
        return newConnection
    }
);

connection.watch((connection) => {
    if(connection) {
        connection.on('message', (message: any) => {
            const activeChat$ = activeChat.getState();
            if(message.dialogId === activeChat$.dialogId) {
                getDialogMessages({...activeChat$, dialogId: message.dialogId});
            }
        });
        connection.on('onConnection', (message: string) => {
            console.log(message);
        });
    }
})