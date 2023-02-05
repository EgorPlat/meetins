import { createEvent, createStore } from "effector";
import { IError } from "../interfaces/error";

export const addNewError = createEvent<IError>();
export const currentErrors = createStore<IError[]>([]).on(addNewError, (prev, newErrorText) => {
    return [...prev, newErrorText];
})