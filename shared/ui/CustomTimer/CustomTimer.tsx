"use client";
import s from "./CustomTimer.module.scss";
import { useCountDown } from "../../../shared/hooks/useCountDown";
import { useEffect, useState } from "react";

interface ICustomTimerProps {
    dateFrom: string | number | Date,
    dateTo: string | number | Date,
    backgroundColor: string,
    color: string
};

interface ITimerInfo {
    seconds: number,
    minutes: number,
    days: number,
    month: number
};

export default function CustomTimer({ dateFrom, dateTo, backgroundColor, color }: ICustomTimerProps) {

    const timer = useCountDown(new Date(dateFrom), new Date(dateTo))
    const [timerInfo, setTimerInfo] = useState<ITimerInfo>({ seconds: 0, days: 0, minutes: 0, month: 0 });
    
    useEffect(() => {
        const date = new Date(timer);

        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const days = date.getDate() - 1;
        const month = date.getMonth();

        setTimerInfo({ seconds, minutes, days, month });
    }, [timer]);

    return (
        <div className={s.customTimer} style={{ backgroundColor, color }}>
            {`${timerInfo?.month}м. ${timerInfo?.days} дней ${timerInfo?.minutes} мин. ${timerInfo?.seconds} сек.`}
        </div>
    )
}