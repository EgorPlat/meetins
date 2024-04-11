import React from "react";
import MarkedEventInfo from "./MarkedEventInfo/markedEventInfo";
import s from "./markedEvents.module.scss";
import CustomLoader from "../../../../components-ui/CustomLoader/CustomLoader";
import { User } from "../../../../global/interfaces";

export default function MarkedEvents(props: {
    user: User
}): JSX.Element {
    
    if (props.user === null) {
        return <CustomLoader />
    }
    if (props.user && props.user?.events.length === 0) {
        return (
            <div className={s.notify}>
                <h5 className={s.title}>У вас пока нет событий в закладках.</h5>
                <h6  className={s.subTitle}>Чтобы сохранить событие в закладках - перейдите в раздел "События", 
                    выберите категорию а затем нужное мероприятие.
                </h6>
            </div>
        )
    }
    if (props.user) {
        return(
            <div className={s.markedEvents}>            
                { props.user?.events.map(event => <MarkedEventInfo eventId={event} key={event} />) }
            </div>
        )
    } else {
        return null;
    }
}