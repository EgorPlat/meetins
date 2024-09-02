import { createEffect, createEvent, createStore, sample } from "effector";
import { IActiveMusic, IMatch, IMusicAuthors, IMusicAuthorsStatistics, IMyMusicStatistic } from "../../entities/music";
import { instance } from "./store";

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
export const setMusicList = createEvent<IMusicAuthors[]>();
export const musicList = createStore<IMusicAuthors[]>([]).on(
    setMusicList,
    (_, newMusicList) => {
        return newMusicList;
    }
);

export const setIsMusicNeededOnBackground = createEvent<boolean>();
export const isMusicNeededOnBackground = createStore<boolean>(false).on(
    setIsMusicNeededOnBackground,
    (_, status) => {
        return status;
    }
);

export const setCurrentAuthorName = createEvent<string>();
export const currentAuthorName = createStore<string>("").on(
    setCurrentAuthorName,
    (_, currentAuthor) => {
        return currentAuthor;
    }
);

export const setMatchesList = createEvent<IMatch[]>();
export const matchesList = createStore<IMatch[]>([]).on(
    setMatchesList,
    (_, newList) => {
        return newList;
    }
);

export const setMyStatistic = createEvent<IMyMusicStatistic[]>();
export const myStatistic = createStore<IMyMusicStatistic[]>([]).on(
    setMyStatistic,
    (_, statistic) => {
        return statistic;
    }
);

export const setAuthorsStatistic = createEvent<IMusicAuthorsStatistics[]>();
export const authorsStatistic = createStore<IMusicAuthorsStatistics[]>([]).on(
    setAuthorsStatistic,
    (_, newStatistics) => {
        return newStatistics;
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

export const setActiveMusicId = createEvent<number>();
export const activeMusicId = createStore<number>(null).on(
    setActiveMusicId,
    (_, id) => {
        return id;
    }
);

activeMusic.on(setActiveMusicCurrentTime, (prevActiveMusic, currentTime) => {
    return { ...prevActiveMusic, currentTime }
})

export const addNewMusic = createEffect(async (data: FormData) => {
    const response = await instance.post(
        "music/add", data
    );
    return response;
})

export const getAllMusic = createEffect(async () => {
    const response = await instance.get(
        "music/getAll"
    );
    return response;
})

export const getMyMusicStatistic = createEffect(async () => {
    const response = await instance.get(
        "music/mine-statistic"
    );
    return response;
})

export const getAuthorsStatistic = createEffect(async () => {
    const response = await instance.get(
        "music/statistic"
    );
    return response;
})

export const addPlaysToComposition = createEffect(async (params: { authorId: string, trackId: string }) => {
    const response = await instance.post(
        `music/plays/${params.authorId}/${params.trackId}`
    );
    return response;
})

export const getMatchesList = createEffect(async () => {
    const response = await instance.get(
        "music/matches"
    );
    return response;
})

export const getAuthorCurrentName = createEffect(async () => {
    const response = await instance.get(
        "music/getAuthorCurrentName"
    );
    return response;
})

sample({
    clock: getAuthorCurrentName.doneData,
    filter: response => response.status <= 217,
    fn: response => response.data,
    target: setCurrentAuthorName
})

sample({
    clock: getMatchesList.doneData,
    filter: response => response.status <= 217,
    fn: response => response.data,
    target: setMatchesList
})


sample({
    clock: getAllMusic.doneData,
    filter: response => response.status === 200,
    fn: response => response.data,
    target: setMusicList
})

sample({
    clock: getMyMusicStatistic.doneData,
    filter: response => response.status === 200,
    fn: response => response.data,
    target: setMyStatistic
})

sample({
    clock: getAuthorsStatistic.doneData,
    filter: response => response.status === 200,
    fn: response => response.data,
    target: setAuthorsStatistic
})