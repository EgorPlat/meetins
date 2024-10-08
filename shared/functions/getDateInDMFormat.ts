export const getDateInDMFormat = (dateString: string | number, fullMonths?: boolean): string => {
    const strArray = fullMonths 
        ? ["янв.", "фев.", "март", "апр.", "мая", "июня", "июля", "авг.", "сен.", "окт.", "нояб.", "дек."]
        : ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"]

    const date = new Date(dateString);
    let day = String(date.getDate());
    let month = String(date.getMonth());

    Number(day) < 10 ? day = "0" + day : day;
    month = strArray[Number(month)]
    return day + " " +  month;
}

export const getDateInDMYFormat = (dateString: string | number): string => {
    const strArray=["янв.", "фев.", "март", "апр.", "мая", "июня", "июля", "авг.", "сен.", "окт.", "нояб.", "дек."];
    const date = new Date(dateString);
    let day = String(date.getDate());
    let month = String(date.getMonth());
    const year = String(date.getFullYear());

    Number(day) < 10 ? day = "0" + day : day;
    month = strArray[Number(month)]
    return day + " " +  month + " " + year;
}