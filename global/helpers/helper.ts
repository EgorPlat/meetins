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
    console.log(onlineList.filter(el => el.email === email));
    
    return onlineList.filter(el => el.email === email).length > 0;
}