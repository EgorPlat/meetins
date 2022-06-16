import { createEffect, createEvent, createStore, sample } from "effector";
import { IShortEventInfo } from "../interfaces/events";
import { instance } from "./store";

export const setCurrentEvent = createEvent<IShortEventInfo[]>();
export const currentEvents = createStore<IShortEventInfo[]>([]).on(setCurrentEvent, (_, newEvents) => {
    return newEvents;
});
export const setLoadedStatus = createEvent<boolean>();
export const loadedStatus = createStore<boolean>(false).on(setLoadedStatus, (_, newStatus) => {
    return newStatus;
});
export const getEvents = createEffect(async (info: {categoryName: string, page: number}) => {
    setLoadedStatus(false);
    const response = await instance.post(
        'event/getEventsCategory', {nameCategory: info.categoryName, page: info.page}
    );
    if(response.status === 201) {
        setCurrentEvent(response.data.results);
        setLoadedStatus(true);
    }
})
