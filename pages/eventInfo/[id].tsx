import { useUnit } from "effector-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    addUserEvent,
    currentEventById,
    currentEventCommentsById,
    getCommentsForEventById,
    getEventById,
    setCurrentEventById
} from "../../global/store/events_model";
import { $user } from "../../global/store/store";
import { addNotification } from "../../global/store/notifications_model";
import EventBlock from "./components/EventBlock";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import Loader from "../../shared/ui/Loader/Loader";


export default function EventInfo(): JSX.Element {

    const currentEventById$ = useUnit(currentEventById);
    const currentEventCommentsById$ = useUnit(currentEventCommentsById);
    const authedUser$ = useUnit($user);

    const { query } = useRouter();

    const addUserEventHandler = (id: number) => {
        if (authedUser$.events?.includes(String(currentEventById$.id))) {
            addNotification({ text: "Уже есть в вашем списке", time: 3000, type: "warning", textColor: "black" });
            return;
        }
        addUserEvent(id);
    };

    useEffect(() => {
        if (query.id) {
            getEventById(String(query.id));
            getCommentsForEventById(String(query.id));
        }
    }, [query]);

    useEffect(() => {
        return () => {
            setCurrentEventById(null);
        }
    }, []);

    return (
        <PageContainer>
            {currentEventById$
                ?
                <EventBlock
                    addUserEvent={addUserEventHandler}
                    currentEventById={currentEventById$}
                    commentsEvent={currentEventCommentsById$}
                />
                : <Loader />}
        </PageContainer>
    )
};

