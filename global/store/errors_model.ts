import { createEvent, createStore } from "effector";
import { ICreatedError, IError } from "../interfaces/error";

export const addNewError = createEvent<IError>();
export const removeError = createEvent<number>();
export const currentErrors = createStore<ICreatedError[]>([]).on(addNewError, (prev, newErrorText) => {
    if (prev.map(error => error.text).includes(newErrorText.text)) return;
    return [...prev, { ...newErrorText, id: prev.length }];
})
currentErrors.on(removeError, (prev, errorId) => {
    return prev.filter(el => el.id !== errorId)
})