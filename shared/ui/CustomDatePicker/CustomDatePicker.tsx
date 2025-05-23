"use client"
import { useEffect, useState } from "react";
import s from "./CustomDatePicker.module.scss";
import { getDateInDMFormat } from "../../functions/getDateInDMFormat";

interface ICustomDatePickerProps {
    maxDate: number | string,
    minDate: number | string,
    handleChangeDate: (date: number) => void
};

export default function CustomDatePicker({ maxDate, minDate, handleChangeDate }: ICustomDatePickerProps) {

    const [dates, setDates] = useState<{ day: number, month: string }[]>([]);

    useEffect(() => {
        let dateStart = new Date(minDate).getTime();
        const dateEnd = new Date(maxDate).getTime();
        let genereatedDates: { day: number, month: string }[] = [];

        while (dateStart <= dateEnd) {
            const currentDate = new Date(dateStart);
            dateStart = dateStart + 24*60*60*1000;
            genereatedDates = [...genereatedDates, {
                day: currentDate.getDate(),
                month: getDateInDMFormat(currentDate.getTime(), false).split(" ")[1]
            }]
        }
        setDates(genereatedDates);
    }, []);
    
    return (
        <div className={s.customDatePicker}>
            <div className={s.list}>
                {
                    dates.map(date => {
                        return (
                            <div className={s.date} key={date.day + date.month}>
                                <div className={s.dayNumber}>{date.day}</div>
                                <div className={s.month}>{date.month}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}