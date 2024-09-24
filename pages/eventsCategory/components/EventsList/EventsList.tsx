import s from "./EventsList.module.scss";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";
import Link from "next/link";
import Image from "next/image";
import { IShortEventInfo } from "../../../../entities/events";
import { customizeDateToYYYYMMDDFormat } from "../../../../shared/functions/getDateInYYYYMMDDFormat";
import { useTranslation } from "react-i18next";

export default function EventsList(props: {
    categoryName: string,
    currentEvents: IShortEventInfo[],
    loadedStatus: boolean
}): JSX.Element {
    
    const { categoryName, currentEvents, loadedStatus } = props;
    const { t } = useTranslation();
    
    return (
        <div className={s.content}>
            <div className={s.title}>
                {t("Текущая категория")}: {categoryName}
            </div>
            <div className={s.list}>
                {loadedStatus ? 
                    <div className={s.list}>
                        {
                            currentEvents?.slice(currentEvents.length - 50, currentEvents.length).map((event) => (
                                <div 
                                    className={s.eventBody} 
                                    key={event.id}
                                >
                                    <div className={s.eventImage}>
                                        <Image
                                            src={event.images[0].image}
                                            //fill
                                            //sizes="100% 100%"
                                            layout="fill"
                                            alt="Category img"
                                        />
                                    </div>
                                    
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
                    loadedStatus && currentEvents.length === 0 
                        ? <div className={s.errorMessage}>В данной категории пока что нет запланированных мероприятий.</div> 
                        : null
                }
            </div>
        </div>
    )
}