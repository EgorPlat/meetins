import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { IEventInfoCard } from "../../../../global/interfaces/events";
import { deleteUserEvent, getEventById, setCurrentEventById } from "../../../../global/store/events_model";
import s from "./markedEventInfo.module.scss";

export default function MarkedEventInfo(props: {eventId: string}): JSX.Element {

    const [currentEvent, setCurrentEvent] = useState<IEventInfoCard>(null);
    const router = useRouter();

    const goToEventInfo = () => {
        setCurrentEventById(null);
        router.push(`eventInfo/${props.eventId}`);
    }
    const handleDeleteUserEvent = () => {
        deleteUserEvent(currentEvent.id);
    }
    useEffect(() => {
        if (!currentEvent) {
            getEventById(props.eventId).then((res) => {
                if (res.status > 217) setCurrentEvent(null);
                setCurrentEvent(res.data);
            });
        }
    }, [currentEvent])
    return(
        <div className={s.markedEventInfo}>
            {!currentEvent && <div className={s.loader}></div>}           
            {currentEvent &&
                <div className={s.markedEventInfoContent}>
                    <div className={s.image} onClick={goToEventInfo}>
                        <img src={currentEvent?.images[0].image} width={270} height={270} />
                    </div>
                    <div className={s.name}>
                        <b>{currentEvent?.title}, {currentEvent?.age_restriction}</b>
                    </div>
                    <div className={s.actions}>
                        <button onClick={handleDeleteUserEvent}>Не пойду.</button>
                        <button onClick={handleDeleteUserEvent}>Уже сходили.</button>
                    </div>
                </div>
            }
        </div>
    )
}