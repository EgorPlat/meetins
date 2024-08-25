import { createEffect, createEvent, createStore, sample } from "effector";
import { ITariff } from "../interfaces/tariffs";
import { instance } from "./store";

export const setTariffs = createEvent<ITariff[]>();
export const tariffs = createStore<ITariff[]>([] as ITariff[]).on(setTariffs, (_, newTariffs) => {
    return newTariffs;
})

export const getTariffsData = createEffect(async () => {
    const response = await instance.get("/tariffs/getTariffsInfo");
    if (response) {
        return response;
    }
})

sample({
    source: getTariffsData.doneData,
    filter: (response) => response.status <= 217,
    fn: (response) => response.data,
    target: setTariffs
})