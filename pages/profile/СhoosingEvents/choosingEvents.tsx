import React, { useEffect, useState } from "react";
import Image from "next/image";
import s from "./choosingEvents.module.scss";
import { useTranslation } from "react-i18next";
import { useStore } from "effector-react";
import { $user } from "../../../global/store/store";
import { currentEvents, getUserEventsInfo, loadedStatus } from "../../../global/store/events_model";
import Loader from "../../../components/Loader/Loader";

export default function ChoosingEvents(props: {
    choosedEvent: (eventId: number) => void
}): JSX.Element {

    const { t } = useTranslation();
    const authedUser = useStore($user);
    const userEvents = useStore(currentEvents);
    const userEventsLoaded = useStore(loadedStatus);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        getUserEventsInfo();
    }, [])

    const updateInvitingEvent = (eventId: number) => {
        setSelectedEvent(eventId);
        props.choosedEvent(eventId);
    }
    return (
        <div className={s.choosingEvents}>
            <table>
                <tr>
                    <td>Название</td>
                    <td>Возрастное ограничение</td>
                    <td>Цена</td>
                    <td>Выбрать</td>
                </tr>
                {
                    userEvents.map(el => (
                        <tr>
                            <td>{el.title}</td>
                            <td>{el.age_restriction}+</td>
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
            { !userEventsLoaded && 
                <div className={s.loaderWrapper}>
                    <Loader />
                </div>
            }
        </div>
    )
} 