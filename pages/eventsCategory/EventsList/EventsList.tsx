import { useStore } from "effector-react";
import { useEffect } from "react";
import { currentEvents, getEvents, loadedStatus } from "../../../global/store/events_model";
import { getCategoryName } from "../../../global/helpers/utils/getCategoryName";
import s from "./EventsList.module.scss";
import List from "./List/List";

export default function EventsList(props: {category: string}): JSX.Element {

    const currentEvents$ = useStore(currentEvents);
    const loadedStatus$ = useStore(loadedStatus);
    const categoryName = getCategoryName(props.category);

    useEffect(() => {
        getEvents({categoryName: props.category, page: 1});
    }, []);
    
    return (
        <div className={s.content}>
            <div className={s.title}>
                {categoryName}
            </div>
            <div className={s.list}>
               {loadedStatus$ ? <List list={currentEvents$}/> : <h4>Загрузка...</h4>}
               {loadedStatus$ && currentEvents$.length === 0 ? <h4>В данной категории пока что нет запланированных мероприятий.</h4> : null}
            </div>
        </div>
    )
}