import { CATEGORY_NAMES } from "./constants";
import { IMyActiveDialogMessage, User } from "../../entities";
import { IGroup } from "../../entities/groups";

export default function calculateCountOfUnredMessageInDialog (messages: IMyActiveDialogMessage[], authedUser: User) {
    if (!messages) return;
    let count = 0;
    messages.map((el) => {
        if (!el?.isRead && el?.senderId !== authedUser?.userId) {
            count++;
        }
    });
    return count;
};

export function findUserInOnlineList( email: string, onlineList: any[] ) {
    if (onlineList.length < 1 || !onlineList) return;
    return onlineList.filter(el => el.email === email).length > 0;
};

export function customizeDateToInputFormatFromDBFormat(date: string) {
    return date.slice(0, 10);
};

export function detectUserLanguage() {
    if (window.navigator.language === "ru") return "ru";
    return "en";
};

export function validateFilesFromInputAndStructuring (inputFiles: File[]) {
    const dataForServer = new FormData();
    Object.values(inputFiles).map(el => {
        const fileType = el.type.split("/")[0];
        dataForServer.append("media", el);
        return {
            lastModified: el.lastModified,
            name: el.name,
            size: el.size,
            webkitRelativePath: el.webkitRelativePath,
            type: fileType
        }
    });
    
    return { dataForClient: inputFiles, dataForServer }
};

export const getTimerFromSeconds = (seconds: number) => {
    if (seconds === 0) {
        return "0";
    };

    const maxMinutes = Math.floor(seconds / 60);
    const maxSeconds = Math.floor(seconds - maxMinutes * 60);

    return `${maxMinutes}:${maxSeconds}`;
};

export const destrucutreFilesInGroupPost = (groupInfo: IGroup) => {

    let mainInfo = {
        images: [],
        videos: [],
        attachments: []
    };

    if (!groupInfo.posts) return mainInfo;

    groupInfo?.posts?.map(post => {
        post.files.map(file => {
            if (file.type.includes("image")) {
                mainInfo = {
                    ...mainInfo,
                    images: [...mainInfo.images, file]
                }
            }
            if (file.type.includes("video")) {
                mainInfo = {
                    ...mainInfo,
                    videos: [...mainInfo.videos, file]
                }
            }
        })
    });

    return mainInfo;
};

export const getCategoryName = (categoryName: string) => {
    return CATEGORY_NAMES.filter(category => category.en === categoryName)[0]?.ru;
}
