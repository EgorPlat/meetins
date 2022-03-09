import { HubConnection } from "@microsoft/signalr";
import { createEffect, createEvent, createStore } from "effector";
import { activeChat, IMyActiveDialogMessage, setActiveChat } from "./chat_model";

export const setNewConnection = createEvent<HubConnection>();
export const connection = createStore<HubConnection | null>(null).on(
    setNewConnection,
    (_, newConnection) => {
        return newConnection
    }
);

export const connectionStart = createEffect((connection: HubConnection | null) => {
    if(connection && localStorage.getItem('access-token') !== "") {
        connection.start().then(result => {
            console.log('Connected!');
        })
        .catch(e => console.log('Connection failed: ', e));
    }
});

connection.watch((connection) => {
    const activeChat$ = activeChat.getState();
    connection && connection.on('Notify', (message: IMyActiveDialogMessage) => {
        if(activeChat$.dialogId === message.dialogId){
            setActiveChat({
                ...activeChat$, 
                messages: [...activeChat$.messages, message],
                content: message.content
            })
        }
    });
})