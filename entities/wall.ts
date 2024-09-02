export interface IWall {
    postTitle: string
    postDescription: string
    postDate: string | number
    postLikes: string[],
    postFiles: {
        src: string,
        type: string
    }[],
    name: string,
    avatar: string,
    isGroup: boolean,
    linkId: number
  }