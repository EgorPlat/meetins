import { createEffect, createEvent, createStore } from "effector";
import { IShortEventInfo } from "../interfaces/events";
import { instance } from "./store";
import { sample } from 'effector';

export const setCurrentEvent = createEvent<IShortEventInfo[]>();
export const currentEvents = createStore<IShortEventInfo[]>([]).on(setCurrentEvent, (_, newEvents) => {
    return newEvents;
});
export const setLoadedStatus = createEvent<boolean>();
export const loadedStatus = createStore<boolean>(false).on(setLoadedStatus, (_, newStatus) => {
    return newStatus;
});
export const getEvents = createEffect(async (info: {categoryName: string, page: number}) => {
    const response = await instance.post(
        'event/getEventsCategory', {nameCategory: info.categoryName, page: info.page}
    );
    return response;
})
sample({ 
    clock: getEvents.doneData, 
    filter: response => response.status === 201, 
    fn: response => response.data, 
    target: currentEvents
})
sample({
    clock: getEvents.pending,
    fn: () => false,
    target: loadedStatus
})
sample({
    clock: getEvents.doneData,
    fn: () => true,
    target: loadedStatus
})