"use client";
import { addUserEvent, currentEventById, currentEventCommentsById, getCommentsForEventById, getEventById, setCurrentEventById } from "@/global/store/events_model";
import { addNotification } from "@/global/store/notifications_model";
import { $user } from "@/global/store/store";
import { useUnit } from "effector-react";
import { useParams } from "next/navigation";
import { JSX, useEffect } from "react";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import EventBlock from "@/components/eventInfo/EventBlock/EventBlock";

export default function EventInfo(): JSX.Element {

    const currentEventById$ = useUnit(currentEventById);
    const currentEventCommentsById$ = useUnit(currentEventCommentsById);
    const authedUser$ = useUnit($user);

    const params = useParams();

    const addUserEventHandler = (id: number) => {
        if (authedUser$?.events?.includes(String(currentEventById$?.id))) {
            addNotification({ text: "Уже есть в вашем списке", time: 3000, type: "warning", textColor: "black" });
            return;
        }
        addUserEvent(id);
    };

    useEffect(() => {
        if (params.id) {
            getEventById(String(params.id));
            getCommentsForEventById(String(params.id));
        }
    }, [params]);

    useEffect(() => {
        return () => {
            setCurrentEventById(null);
        }
    }, []);

    if (currentEventById$) {
        return (
            <EventBlock
                addUserEvent={addUserEventHandler}
                currentEventById={currentEventById$}
                commentsEvent={currentEventCommentsById$}
            />
        )
    } else {
        <CustomLoader />
    }
};

