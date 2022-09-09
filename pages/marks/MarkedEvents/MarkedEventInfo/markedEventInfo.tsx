import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Loader from "../../../../components/Loader/Loader";
import { IEventInfoCard } from "../../../../global/interfaces/events";
import { getEventById, setCurrentEventById } from "../../../../global/store/events_model";
import s from "./markedEventInfo.module.scss";

export default function MarkedEventInfo(props: {eventId: string}): JSX.Element {

    const [currentEvent, setCurrentEvent] = useState<IEventInfoCard>(null);
    const router = useRouter();

    const goToEventInfo = () => {
        setCurrentEventById(null);
        router.push(`eventInfo/${props.eventId}`);
    }
    useEffect(() => {
        getEventById(props.eventId).then((res) => setCurrentEvent(res.data));
    }, [])
    return(
        <div className={s.markedEventInfo}>
            {currentEvent === null && <div className={s.loader}></div>}           
            {currentEvent !== null &&
                <div className={s.markedEventInfoContent}>
                    <div className={s.image} onClick={goToEventInfo}>
                        <img src={currentEvent.images[0].image} width={270} height={270} />
                    </div>
                    <div className={s.name}>
                        <b>{currentEvent.title}, {currentEvent.age_restriction}</b>
                    </div>
                    <div className={s.actions}>
                        <button>Не пойду.</button>
                        <button>Уже сходили.</button>
                    </div>
                </div>
            }
        </div>
    )
}