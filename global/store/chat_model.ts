import { createEffect, createEvent, createStore } from "effector";

export const setActiveChat = createEvent<IActiveChat>();
export const activeChat = createStore<IActiveChat | null>(null).on(setActiveChat, (_, newActiveChat) => {
    return newActiveChat;
})

/*const getMyDialogs = createEffect();

getMyDialogs.use(async () => {
    const response = 
})*/

export interface IActiveChat {
    avatar: string,
    name: string,
    messages: IMessage[],
    status: boolean
}
export interface IMessage {
    userID: string,
    text: string,
    date?: number
}