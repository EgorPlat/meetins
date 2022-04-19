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
export const setFilterParams = createEvent();
export const filterParams = createStore<Params>({gender: "1", age: 50, goal: '1', events: ["1"], interests:["1"]});

export const getAllPeoples = createEffect(async () => {
    const response = await instance.get('/users/getUserList');
    if(response.status === 200) {
        setAllPeoples(response.data);
        return response.data;
    }
});
getAllPeoples.doneData.watch((peoples: IPeople[]) => {
    setIsPeoplesLoaded(true);
})

export interface IPeople {
    login: string,
    userName: string,
    userAvatar: string,
    status: string,
    age: 0,
    city: string,
    gender: string,
}
export interface Params {
    gender: string,
    age: number,
    goal: string,
    events: string[],
    interests: string[],
}
export interface IParams {
    gender?: string,
    age?: number,
    goal?: string,
    events?: string[],
    interests?: string[],
}