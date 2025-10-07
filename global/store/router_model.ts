import { createEvent, createStore } from "effector";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type ExtendedRouter = AppRouterInstance & {
    asPath: string
}

export const setRouter = createEvent<ExtendedRouter>();
export const instanseRouter = createStore<ExtendedRouter | null>(null).on(setRouter, (_, router) => {
    return router;
});
