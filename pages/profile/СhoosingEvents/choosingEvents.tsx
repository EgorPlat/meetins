import React, { useEffect, useState } from "react";
import Image from "next/image";
import s from "./choosingEvents.module.scss";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";
import { $user } from "../../../global/store/store";
import { getUserEventsInfo, loadedStatus, setUserEvents, userEvents } from "../../../global/store/events_model";
import CustomLoader from "../../../components-ui/CustomLoader/CustomLoader";

export default function ChoosingEvents(props: {
    choosedEvent: (eventId: number) => void
}): JSX.Element {

    const { t } = useTranslation();
    const authedUser = useStore($user);
    const userEvents$ = useStore(userEvents);
    const userEventsLoaded = useStore(loadedStatus);
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
    } else {
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
                                <td>{+el.price === 0 ? 'Бесплатно' : el.price + "+"}</td>
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