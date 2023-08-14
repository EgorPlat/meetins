import { useStore } from "effector-react";
import React from "react";
import { $user } from "../../../global/store/store";
import MarkedEventInfo from "./MarkedEventInfo/markedEventInfo";
import s from "./markedEvents.module.scss";
import Loader from "../../../components-ui/Loader/Loader";
import CustomLoader from "../../../components-ui/CustomLoader/CustomLoader";

export default function MarkedEvents(): JSX.Element {

    const user = useStore($user);
    
    if (user === null) {
        return <CustomLoader />
    }
    if (user.events.length === 0) {
        return (
            <div className={s.notify}>
                <h5 className={s.title}>У вас пока нет событий в закладках.</h5>
                <h6  className={s.subTitle}>Чтобы сохранить событие в закладках - перейдите в раздел "События", 
                    выберите категорию а затем нужное мероприятие.
                </h6>
            </div>
        )
    }
    return(
        <div className={s.markedEvents}>            
            { user.events.map(event => <MarkedEventInfo eventId={event} key={event} />) }
        </div>
    )
}