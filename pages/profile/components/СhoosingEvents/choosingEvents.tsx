import React, { useEffect, useState } from "react";
import s from "./choosingEvents.module.scss";
import { useUnit } from "effector-react";
import { getUserEventsInfo, loadedStatus, setUserEvents, userEvents } from "../../../../global/store/events_model";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";

export default function ChoosingEvents(props: {
    choosedEvent: (eventId: number) => void
}): JSX.Element {

    const userEvents$ = useUnit(userEvents);
    const userEventsLoaded = useUnit(loadedStatus);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        getUserEventsInfo();
        return () => {
            setUserEvents([]);
        }
    }, [])

    const updateInvitingEvent = (eventId: number) => {
        setSelectedEvent(eventId);
        props.choosedEvent(eventId);
    }

    if (!userEventsLoaded) {
        return (
            <div className={s.loaderWrapper}>
                <CustomLoader />
            </div>
        )
    } 
    else if (userEvents$.length === 0) {
        return (
            <div>У вас пока нет событий в Закладках.</div>
        )
    } 
    else {
        return (
            <div className={s.choosingEvents}>
                <table>
                    <tr>
                        <td>Название</td>
                        <td>Цена</td>
                        <td>Выбрать</td>
                    </tr>
                    {
                        userEvents$.map(el => (
                            <tr key={el.title}>
                                <td>{el.title}</td>
                                <td>{+el.price === 0 ? "Бесплатно" : el.price + "+"}</td>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedEvent === el.id} 
                                        onChange={() => updateInvitingEvent(el.id)} 
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        )
    }
} 