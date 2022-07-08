export function getMinutesAndHoursFromString(dateString: string){
    const date = new Date(dateString);
    let hours = String(date.getHours());
    let minutes = String(date.getMinutes());

    Number(minutes) < 10 ? minutes = "0" + minutes : minutes;
    Number(hours) < 10 ? hours = "0" + hours : hours;

    return hours + ":" + minutes
}