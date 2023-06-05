import { createEffect, createEvent, createStore } from "effector";
import { IShortEventInfo, IEventInfoCard, IUnitedInvitesEvent, IInnerInviteEvent, IOuterInviteEvent } from "../interfaces/events";
import { instance, setUser } from "./store";
import { sample } from 'effector';
import { addNewError } from "./errors_model";

export const setCurrentEvents = createEvent<IShortEventInfo[]>();
export const currentEvents = createStore<IShortEventInfo[]>([]).on(setCurrentEvents, (_, newEvents) => {
    return newEvents;
});
export const setCurrentEventById = createEvent<IEventInfoCard>();
export const currentEventById = createStore<IEventInfoCard | null>(null).on(setCurrentEventById, (_, currentEvent) => {
    return currentEvent;
});
export const setLoadedStatus = createEvent<boolean>();
export const loadedStatus = createStore<boolean>(false).on(setLoadedStatus, (_, newStatus) => {
    return newStatus;
});

export const setUnitedInnerInviteEvents = createEvent<IInnerInviteEvent[]>();
export const setUnitedOuterInviteEvents = createEvent<IOuterInviteEvent[]>();
export const unitedInviteEvents = createStore<IUnitedInvitesEvent>({
    innerInvites: [] as IInnerInviteEvent[],
    outerInvites: [] as IOuterInviteEvent[]
});

unitedInviteEvents.on(setUnitedInnerInviteEvents, (prev, innerInvites) => {
    return {...prev, innerInvites: innerInvites}
});
unitedInviteEvents.on(setUnitedOuterInviteEvents, (prev, outerInvites) => {
    return {...prev, outerInvites: outerInvites}
})

export const sendInviteToUser = createEffect(async (data: {userToId: string | number, eventId: string | number}) => {
    const response = await instance.post(
        'event/sendInviteToUser', {userIdTo: data.userToId, eventId: data.eventId}
    );
    return response;
})
export const getEvents = createEffect(async (info: {categoryName: string, page: number}) => {
    const response = await instance.post(
        'event/getEventsCategory', {nameCategory: info.categoryName, page: info.page}
    );
    return response;
})
export const getEventById = createEffect(async (id: string) => {
    const response = await instance.post(
        'event/getEventInfoById', {eventId: id}
    );
    return response;
})
export const getUserEventsInfo = createEffect(async () => {
    const response = await instance.get(
        'event/getUserEventsInfo'
    );
    return response;
})
export const getUserInnerInvitesEventInfo = createEffect(async () => {
    const response = await instance.get(
        'event/getUserInnerInvitesEventInfo'
    );
    return response;
})
export const getUserOuterInvitesEventInfo = createEffect(async () => {
    const response = await instance.get(
        'event/getUserOuterInvitesEventInfo'
    );
    return response;
})
export const addUserEvent = createEffect(async (id: number) => {
    const response = await instance.post(
        'users/addUserEvent', {eventId: String(id)}
    );
    return response;
})
export const deleteUserEvent = createEffect(async (id: number) => {
    const response = await instance.post(
        'users/deleteUserEvent', {eventId: String(id)}
    );
    return response;
})
sample({ 
    clock: getUserEventsInfo.doneData, 
    filter: response => response.status <= 201, 
    fn: response => response.data, 
    target: setCurrentEvents
})
sample({ 
    clock: addUserEvent.doneData, 
    filter: response => response.status === 201, 
    fn: response => response.data, 
    target: setUser
})
sample({ 
    clock: deleteUserEvent.doneData, 
    filter: response => response.status === 201, 
    fn: response => response.data, 
    target: setUser
})
sample({ 
    clock: getEventById.doneData, 
    filter: response => response.status === 201, 
    fn: response => response.data, 
    target: currentEventById
})
sample({ 
    clock: getEvents.doneData, 
    filter: response => response.status === 201, 
    fn: response => response.data, 
    target: currentEvents
})

sample({
    clock: getUserOuterInvitesEventInfo.doneData, 
    filter: response => response.status <= 217, 
    fn: response => response.data, 
    target: setUnitedOuterInviteEvents
})
sample({ 
    clock: getUserInnerInvitesEventInfo.doneData, 
    filter: response => response.status <= 217, 
    fn: response => response.data, 
    target: setUnitedInnerInviteEvents
})
sample({ 
    clock: addUserEvent.doneData, 
    filter: response => response.status <= 217, 
    fn: (response) => {
        return { text: "Успешно добавлено в 'Закладки'", time: 3000, color: "green", textColor: "white" }
    }, 
    target: addNewError
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
sample({
    clock: getUserEventsInfo.pending,
    fn: () => false,
    target: loadedStatus
})
sample({
    clock: getUserEventsInfo.doneData,
    fn: () => true,
    target: loadedStatus
})