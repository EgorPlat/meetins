import { createEvent, createStore } from "effector";
import { NextRouter } from "next/router";

export const setRouter = createEvent<NextRouter>();
export const instanseRouter = createStore<NextRouter | null>(null).on(setRouter ,(_, router) => {
    return router;
});
