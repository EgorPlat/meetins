import { createEffect, createEvent, createStore, sample } from "effector";
import { Socket } from "socket.io-client";
import { IMyDialog } from "../../entities";
import { activeChat, setActiveChat, setIsUserUnReadMessagesExists, updatedIsReadMessagesInActiveDialog } from "./chat_model";
import { setOnlineUsers } from "./store";

export const setNewConnection = createEvent<Socket>();
export const connection = createStore<Socket | null>(null).on(
    setNewConnection,
    (_, newConnection) => {
        return newConnection
    }
);
export const connectionWatcher = createEffect((obj: { connection: Socket | null, activeChat: IMyDialog | null }) => {
    obj.connection?.removeAllListeners();
    obj.connection?.on("message", (message: any) => {
        if (message.dialogId === obj.activeChat?.dialogId) {
            if (obj.activeChat && obj.activeChat?.userName === message.senderName) {
                setActiveChat({
                    ...obj.activeChat,
                    messages: [...(obj.activeChat?.messages || []), message]
                });
                updatedIsReadMessagesInActiveDialog(message.dialogId);
            }
        } else {
            setIsUserUnReadMessagesExists(true);
        }
    });
    obj.connection?.on("updateUsers", (message: any) => {
        setOnlineUsers(message.users);
    });
    obj.connection?.on("connect", () => {
        console.log("Successfully connected to socket");
    });
})
sample({
    source: { connection: connection, activeChat: activeChat },
    target: connectionWatcher
})