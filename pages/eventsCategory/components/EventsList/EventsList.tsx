import { useStore } from "effector-react";
import { useEffect } from "react";
import { currentEvents, getEvents, loadedStatus } from "../../../../global/store/events_model";
import { getCategoryName } from "../../../../global/helpers/utils/getCategoryName";
import s from "./EventsList.module.scss";
import List from "./List/List";
import CustomLoader from "../../../../components-ui/CustomLoader/CustomLoader";

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
                Текущая категория: {categoryName}
            </div>
            <div className={s.list}>
               {loadedStatus$ ? <List list={currentEvents$}/> : <CustomLoader marginTop={100} />}
               {
               loadedStatus$ && currentEvents$.length === 0 
               ? <div className={s.errorMessage}>В данной категории пока что нет запланированных мероприятий.</div> 
               : null
               }
            </div>
        </div>
    )
}