import { createEffect, createEvent, createStore, sample } from "effector";
import { instance } from "./store";
import { IWall } from "../interfaces/wall";

export const setCurrentWall = createEvent<IWall[]>();
export const currentWall$ = createStore<IWall[]>(null).on(setCurrentWall, (_, currentWall) => {
    return currentWall;
})


export const getCurrentWall = createEffect(async () => {
    const response = await instance.get('/wall');
    return response;
})

sample({
    clock: getCurrentWall.doneData,
    filter: (res) => res.status <= 217,
    fn: (res) => res.data,
    target: setCurrentWall
})