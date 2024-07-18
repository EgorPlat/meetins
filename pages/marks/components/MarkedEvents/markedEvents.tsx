import React from "react";
import MarkedEventInfo from "./MarkedEventInfo/markedEventInfo";
import s from "./markedEvents.module.scss";
import { IShortEventInfo } from "../../../../global/interfaces/events";

export default function MarkedEvents(props: {
    markedEvents: IShortEventInfo[]
}): JSX.Element {
    
    if (props.markedEvents?.length === 0) {
        return (
            <div className={s.notify}>
                <h5 className={s.title}>У вас пока нет событий в закладках.</h5>
                <div  className={s.subTitle}>Чтобы сохранить событие в закладках - перейдите в раздел "События", 
                    выберите категорию а затем нужное мероприятие.
                </div>
            </div>
        )
    }
    if (props.markedEvents) {
        return(
            <div className={s.markedEvents}>            
                { props.markedEvents?.map(event => <MarkedEventInfo event={event} key={event.id} />) }
            </div>
        )
    } else {
        return null;
    }
}