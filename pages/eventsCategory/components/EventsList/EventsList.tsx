import { useStore } from "effector-react";
import { useEffect } from "react";
import { currentEvents, getEvents, loadedStatus } from "../../../../global/store/events_model";
import { getCategoryName } from "../../../../global/helpers/utils/getCategoryName";
import s from "./EventsList.module.scss";
import CustomLoader from "../../../../global/components-ui/CustomLoader/CustomLoader";
import { customizeDateToYYYYMMDDFormat } from "../../../../global/helpers/helper";
import Link from "next/link";
import Image from "next/image";

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
                {loadedStatus$ ? 
                    <div className={s.list}>
                        {
                            currentEvents$?.slice(currentEvents$.length - 50, currentEvents$.length).map((event) => (
                                <div 
                                    className={s.eventBody} 
                                    key={event.id}
                                >
                                    <Image
                                        src={event.images[0].image}
                                        width="100px"
                                        height="40px"
                                        layout="responsive"
                                        className={s.eventImage}
                                    ></Image>
                                    
                                    <div className={s.eventDescription}>
                                        <div className={s.eventTitle}>{event.title}</div>
                                        <div className={s.eventPrice}>
                                            <p>Примерная цена:</p>
                                            <p className={event.price.length > 0 ? s.notFree : s.free}>
                                                {event.price.length > 0 ? event.price : "Бесплатно"}
                                            </p>
                                        </div>
                                        <div className={s.eventAge}>
                                            <p>Возраст для посещения: </p>
                                            <p className={s.age}>
                                                {event.age_restriction || "0+"} лет
                                            </p>
                                        </div>
                                        {
                                            event.dates[event.dates.length - 2] &&
                                            <div className={s.eventDates}>
                                                <p>Ближайшая дата: </p>
                                                <p className={s.date}>
                                                    {customizeDateToYYYYMMDDFormat(event.dates[event.dates.length - 2]?.start  * 1000)}
                                                </p>
                                            </div>
                                        }
                                        <div className={s.eventActions}>
                                            <Link href={`/eventInfo/${event.id}`}>Посмотреть</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    : <CustomLoader marginTop={100} />
                }
                {
                    loadedStatus$ && currentEvents$.length === 0 
                        ? <div className={s.errorMessage}>В данной категории пока что нет запланированных мероприятий.</div> 
                        : null
                }
            </div>
        </div>
    )
}