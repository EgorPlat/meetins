import { useStore } from "effector-react";
import React from "react";
import { $user } from "../../../global/store/store";
import MarkedEventInfo from "./MarkedEventInfo/markedEventInfo";
import s from "./markedEvents.module.scss";
import Loader from "../../../components-ui/Loader/Loader";

export default function MarkedEvents(): JSX.Element {

    const user = useStore($user);
    
    if (user === null) {
        return <Loader />
    }
    return(
        <div className={s.markedEvents}>            
            { user.events.map(event => <MarkedEventInfo eventId={event} key={event} />) }
        </div>
    )
}