import { IMyActiveDialogMessage, IMyDialog, User } from "../interfaces";

export default function calculateCountOfUnredMessageInDialog (messages: IMyActiveDialogMessage[], authedUser: User) {
    if (!messages) return;
    let count = 0;
    messages.map((el) => {
        if (!el.isRead && el.senderId !== authedUser.userId) {
            count++;
        }
    });
    return count;
}

export function customizeDateToYYYYMMDDFormat (date: string | number) {
    let newDate = new Date(date);
    let day = String(newDate.getDate());
    let month = String(newDate.getMonth() + 1);
    let year = String(newDate.getFullYear());
    if (+day < 10) {
        day = '0' + `${day}`
    }
    if (+month < 10) {
        month = '0' + `${month}`
    }
    return `${year}-${month}-${day}`
}

export function findUserInOnlineList( email: string, onlineList: any[] ) {
    if (onlineList.length < 1 || !onlineList) return;
    return onlineList.filter(el => el.email === email).length > 0;
}

export function customizeDateToInputFormatFromDBFormat(date: string) {
    return date.slice(0, 10);
}
export function detectUserLanguage() {
    if (window.navigator.language === 'ru') return 'ru';
    return 'en';
}

export function validateFilesFromInputAndStructuring (inputFiles: File[]) {
    const dataForServer = new FormData();
    Object.values(inputFiles).map(el => {
        const fileType = el.type.split('/')[0];
        dataForServer.append('media', el);
        return {
            lastModified: el.lastModified,
            name: el.name,
            size: el.size,
            webkitRelativePath: el.webkitRelativePath,
            type: fileType
        }
    });
    
    return { dataForClient: inputFiles, dataForServer }
}

export const getTimerFromSeconds = (seconds: number) => {
    if (seconds === 0) {
        return `0`;
    }
    const maxMinutes = Math.floor(seconds / 60);
    const maxSeconds = Math.floor(seconds - maxMinutes * 60);

    return `${maxMinutes}:${maxSeconds}`;
}