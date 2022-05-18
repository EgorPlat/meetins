import { createEffect, createEvent, createStore } from "effector";
import { IPeople, Params } from "../interfaces";
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