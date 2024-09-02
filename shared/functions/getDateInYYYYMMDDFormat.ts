export function customizeDateToYYYYMMDDFormat (date: string | number) {
    const newDate = new Date(date);
    let day = String(newDate.getDate());
    let month = String(newDate.getMonth() + 1);
    const year = String(newDate.getFullYear());
    if (+day < 10) {
        day = "0" + `${day}`
    }
    if (+month < 10) {
        month = "0" + `${month}`
    }
    return `${year}-${month}-${day}`
}