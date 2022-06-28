import { useStore } from "effector-react";
import { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { currentEvents, getEvents, loadedStatus } from "../../../global/store/events_model";
import s from "./EventsList.module.scss";
import List from "./List/List";

export default function EventsList(props: {category: string}): JSX.Element {

    const currentEvents$ = useStore(currentEvents);
    const loadedStatus$ = useStore(loadedStatus);
    
    useEffect(() => {
        getEvents({categoryName: props.category, page: 1});
    }, [])
    return (
        <div className={s.content}>
            <div className={s.title}>
                {props.category}
            </div>
            <div className={s.list}>
               {loadedStatus$ ? <List list={currentEvents$}/> : <Loader/>} 
            </div>
        </div>
    )
}