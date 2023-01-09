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
    let day = String(newDate.getDate() + 1);
    let month = String(newDate.getMonth());
    let year = String(newDate.getFullYear());
    if (+day < 10) {
        day = '0' + `${day}`
    }
    if (+month < 10) {
        month = '0' + `${month}`
    }
    return `${year}-${month}-${day}`
}