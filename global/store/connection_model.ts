import { HubConnection } from "@microsoft/signalr";
import { createEvent, createStore } from "effector";

export const setNewConnection = createEvent<HubConnection>();
export const connection = createStore<HubConnection | null>(null).on(
    setNewConnection,
    (_, newConnection) => {
        return newConnection
    }
);