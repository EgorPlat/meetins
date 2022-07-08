export function getMinutesAndHoursFromString(dateString: string){
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    minutes < 10 ? minutes = 0 + minutes : minutes;
    hours < 10 ? hours = 0 + hours : hours;

    return hours + ":" + minutes
}