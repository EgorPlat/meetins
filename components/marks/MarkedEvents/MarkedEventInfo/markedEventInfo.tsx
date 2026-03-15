import React, { JSX } from "react";
import { useRouter } from "next/navigation";
import { IShortEventInfo } from "@/entities/events";
import { setCurrentEventById, deleteUserEvent } from "@/global/store/events_model";
import s from "./markedEventInfo.module.scss";
import { Tooltip } from "antd";
import { FaEnvelopeCircleCheck, FaTrash } from "react-icons/fa6";

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
            {/*props.event &&
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
            */}
            <img src={props.event?.images[0].image} className={s.image} />
            <div className={s.info}>
                <div className={s.title}>{props.event?.title}</div>
                <div className={s.description} dangerouslySetInnerHTML={{ __html: props.event?.description }}></div>
            </div>
            <div className={s.actions}>
                <Tooltip title="Не пойду">
                    <FaTrash 
                        className={s.action} 
                        fontSize={18}
                        onClick={handleDeleteUserEvent}
                    />
                </Tooltip>
            </div>
        </div>
    )
}