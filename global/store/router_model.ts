import { createEvent, createStore } from "effector";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type ExtendedRputer = AppRouterInstance & {
    asPath: string
}

export const setRouter = createEvent<ExtendedRputer>();
export const instanseRouter = createStore<ExtendedRputer | null>(null).on(setRouter, (_, router) => {
    return router;
});
