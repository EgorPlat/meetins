import { useStore } from "effector-react";
import { userEvents } from "../../../../global/store/events_model";
import React from "react";
import MarkedEventInfo from "./MarkedEventInfo/markedEventInfo";
import s from "./markedEvents.module.scss";

export default function MarkedEvents(): JSX.Element {

    const markedEventsInfo$ = useStore(userEvents);

    if (markedEventsInfo$?.length === 0) {
        return (
            <div className={s.notify}>
                <h5 className={s.title}>У вас пока нет событий в закладках.</h5>
                <div className={s.subTitle}>Чтобы сохранить событие в закладках - перейдите в раздел "События",
                    выберите категорию а затем нужное мероприятие.
                </div>
            </div>
        )
    }
    if (markedEventsInfo$) {
        return (
            <div className={s.markedEvents}>
                {markedEventsInfo$?.map(event => <MarkedEventInfo event={event} key={event.id} />)}
            </div>
        )
    } else {
        return null;
    }
}