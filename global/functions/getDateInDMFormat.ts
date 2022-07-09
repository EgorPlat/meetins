export const getDateInDMFormat = (dateString: string): string => {
    var strArray=['янв.', 'фев.', 'март', 'апр.', 'мая', 'июня', 'июля', 'авг.', 'сен.', 'окт.', 'нояб.', 'дек.'];
    const date = new Date(dateString);
    let day = String(date.getDate());
    let month = String(date.getMonth());

    Number(day) < 10 ? day = "0" + day : day;
    month = strArray[Number(month)]
    return day + " " +  month;
}