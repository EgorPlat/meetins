import { createEvent, createStore } from "effector";
import { ICreatedNotification, INotification } from "../interfaces/notification";

export const addNotification = createEvent<INotification>();
export const removeNotification = createEvent<number>();
export const currentNotifications = createStore<ICreatedNotification[]>([]).on(addNotification, (prev, notification) => {
    if (prev.map(error => error.text).includes(notification.text)) return;
    return [...prev, { ...notification, id: prev.length }];
})
currentNotifications.on(removeNotification, (prev, errorId) => {
    return prev.filter(el => el.id !== errorId)
})