import { useStore } from "effector-react";
import React from "react";
import Loader from "../../../components/Loader/Loader";
import { $user } from "../../../global/store/store";
import MarkedEventInfo from "./MarkedEventInfo/markedEventInfo";
import s from "./markedEvents.module.scss";

export default function MarkedEvents(): JSX.Element {

    const user = useStore($user);

    if (user === null) {
        return <Loader />
    }
    return(
        <div className={s.markedEvents}>            
            { user.events.filter(event => typeof event === 'string' && event.length > 0).map(event => <MarkedEventInfo eventId={event} />) }
        </div>
    )
}