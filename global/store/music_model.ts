import { createEvent, createStore } from "effector";
import { IActiveMusic } from "../interfaces/music";

export const setActiveMusicTimeData = createEvent<{ currentTime: number, duration: number }>();
export const activeMusicTimeData = createStore<{ currentTime: number, duration: number }>({ 
    currentTime: 0, 
    duration: 0 
}).on(
    setActiveMusicTimeData,
    (_, newActiveMusicTimeData) => {
        return newActiveMusicTimeData;
    }
);

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