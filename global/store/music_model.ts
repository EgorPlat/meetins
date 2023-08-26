import { createEvent, createStore } from "effector";
import { IActiveMusic } from "../interfaces/music";

export const setActiveMusic = createEvent<IActiveMusic>();
export const setActiveMusicCurrentTime = createEvent<number>();
export const activeMusic = createStore<IActiveMusic>(null).on(
    setActiveMusic,
    (_, newActiveMusic) => {
        return newActiveMusic;
    }
);
activeMusic.on(setActiveMusicCurrentTime, (prevActiveMusic, currentTime) => {
    return { ...prevActiveMusic, currentTime }
})