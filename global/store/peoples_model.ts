import { createEffect, createEvent, createStore } from "effector";
import { instance } from "./store";

export const setAllPeoples = createEvent<IPeople[]>();
export const allPeoples = createStore<IPeople[]>([]).on(setAllPeoples, (_, peoples) => {
    return peoples;
});

export const setIsPeoplesLoaded = createEvent<boolean>();
export const isPeoplesLoaded = createStore<boolean>(false).on(setIsPeoplesLoaded, (_, peoplesLoaded) => {
    return peoplesLoaded;
});

export const getAllPeoples = createEffect(async () => {
    const response = await instance.get('/people/all');
    if(response.status === 200) {
        setAllPeoples(response.data);
        return response.data;
    }
});
getAllPeoples.doneData((peoples: IPeople[]) => {
    setIsPeoplesLoaded(true);
})
export interface IPeople {
    userId: string,
    userName: string,
    userAvatar: string,
    status: string,
    age: 0,
    city: string
}