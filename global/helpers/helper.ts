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

export function customizeDateToYYYYMMDDFormat (date: string) {
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

export const turnOffAllMediaTracks = (navigator: Navigator) => {
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        devices.forEach(device => {
        // является ли устройство медиа-устройством ввода
        if (device.kind === 'videoinput' || device.kind === 'audioinput') {
            // получаем все треки устройства
            navigator.mediaDevices.getUserMedia({
                audio: { deviceId: device.deviceId },
                video: { deviceId: device.deviceId }
            })
            .then(stream => {
                // получаем все треки потока
                stream.getTracks().forEach(track => {
                    // закрываем каждый трек
                    track.stop();
                });
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
        }
        });
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

export const getTimerFromSeconds = (seconds: number) => {
    if (seconds === 0) {
        return `0`;
    }
    const maxMinutes = Math.floor(seconds / 60);
    const maxSeconds = Math.floor(seconds - maxMinutes * 60);

    return `${maxMinutes}:${maxSeconds}`;
}