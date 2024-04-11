export interface IActiveMusic {
    title: string,
    image: string,
    currentTime: number,
    duration: number,
    src: string,
    id: string,
    authorId: string
}

export interface IMusic {
    audioSrc: string,
    imageSrc: string,
    title: string,
    description: string,
    playsNumber: number,
    id: number
}
export interface IMusicAuthors {
    authorId: string,
    name: string,
    compositions: IMusic[]
}

export interface IMusicAuthorsStatistics {
    id: string,
    name: string,
    playsNumber: number
}

export interface IMyMusicStatistic {
    title: string,
    image: string,
    playsNumber: number,
    author: string
}

export interface IMatch {
    login: number,
    name: string,
    avatar: string
}