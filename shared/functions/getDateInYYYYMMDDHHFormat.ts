export function customizeDateToYYYYMMDDHHMMFormat (date: string | number) {
    const newDate = new Date(date);
    let day = String(newDate.getDate());
    let month = String(newDate.getMonth() + 1);
    const year = String(newDate.getFullYear());
    let hours = String(newDate.getHours());
    let minutes = String(newDate.getMinutes());
    if (+day < 10) {
        day = "0" + `${day}`
    }
    if (+month < 10) {
        month = "0" + `${month}`
    }
    if (+hours < 10) {
        hours = "0" + `${hours}`
    }
    if (+minutes < 10) {
        minutes = "0" + `${minutes}`
    }
    return `${year}-${month}-${day} ${hours}:${minutes}`
}