import React, { JSX } from "react";
import { useRouter } from "next/navigation";
import { IShortEventInfo } from "@/entities/events";
import { setCurrentEventById, deleteUserEvent } from "@/global/store/events_model";
import s from "./markedEventInfo.module.scss";

export default function MarkedEventInfo(props: { event: IShortEventInfo }): JSX.Element {

    const router = useRouter();

    const goToEventInfo = () => {
        setCurrentEventById(null);
        router.push(`eventInfo/${props.event.id}`);
    };

    const handleDeleteUserEvent = () => {
        deleteUserEvent(+props.event.id);
    };

    return (
        <div className={s.markedEventInfo}>
            {props.event &&
                <div className={s.markedEventInfoContent}>
                    <div className={s.image} onClick={goToEventInfo}>
                        <img src={props.event?.images[0].image} />
                    </div>
                    <div className={s.name}>
                        <b>{props.event?.title}, {props.event?.age_restriction}</b>
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