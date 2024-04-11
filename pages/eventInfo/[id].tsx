import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { addUserEvent, currentEventById, currentEventCommentsById, getCommentsForEventById, getEventById, setCurrentEventById } from "../../global/store/events_model";
import { $user } from "../../global/store/store";
import EventBlock from "./components/EventBlock";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import Loader from "../../components-ui/Loader/Loader";
import { addNotification } from "../../global/store/notifications_model";


export default function EventInfo(): JSX.Element {

    const currentEventById$ = useStore(currentEventById);
    const currentEventCommentsById$ = useStore(currentEventCommentsById);
    const authedUser$ = useStore($user);

    const { query } = useRouter();

    const addUserEventHandler = (id: number) => {
        if (authedUser$.events.includes(String(currentEventById$.id))) {
            addNotification({ text: "Уже есть в вашем списке", time: 3000, color: 'orange', textColor: "black" });
            return;
        }
        addUserEvent(id);
    }
    
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

	return(
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

