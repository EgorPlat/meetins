import React, { JSX, useEffect, useState } from "react";
import s from "./choosingEvents.module.scss";
import { useUnit } from "effector-react";
import { getUserEventsInfo, loadedStatus, setUserEvents, userEvents } from "../../../global/store/events_model";
import CustomLoader from "../../../shared/ui/CustomLoader/CustomLoader";

export default React.memo(function ChoosingEvents(props: {
    choosedEvent: (eventId: number) => void
}): JSX.Element {

    const userEvents$ = useUnit(userEvents);
    const userEventsLoaded = useUnit(loadedStatus);
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

    const updateInvitingEvent = (eventId: number) => {
        setSelectedEvent(eventId);
        props.choosedEvent(eventId);
    };

    useEffect(() => {
        getUserEventsInfo();
        return () => {
            setUserEvents([]);
        }
    }, []);

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
                    <tbody>
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
                    </tbody>
                </table>
            </div>
        )
    }
})