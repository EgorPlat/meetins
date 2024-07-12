import { IShortEventInfo } from "../../../../../global/interfaces/events";
import Image from "next/image";
import s from './List.module.scss';
import Link from "next/link";
import { customizeDateToYYYYMMDDFormat } from "../../../../../global/helpers/helper";

export default function List(props: {list: IShortEventInfo[]}): JSX.Element {

    return (
        <div className={s.list}>
            {
            props.list?.slice(props.list.length - 50, props.list.length).map((event) => 
                <div 
                    className={s.eventBody} 
                    key={event.id}
                >
                    <Image
                        className={s.eventImage}
                        layout="responsive"
                        width="100px"
                        height="40px"
                        src={event.images[0].image}
                    />
                    <div className={s.eventDescription}>
                        <div className={s.eventTitle}>{event.title}</div>
                        <div className={s.eventPrice}>
                            Примерная цена: 
                            <button className={event.price.length > 0 ? s.notFree : s.free}>
                                {event.price.length > 0 ? event.price : 'Бесплатно'}
                            </button>
                        </div>
                        <div className={s.eventAge}>
                            Возраст для посещения: 
                            <div className={s.age}>{event.age_restriction} лет</div>
                        </div>
                        {
                            event.dates[event.dates.length - 2] &&
                            <div className={s.eventDates}>
                                Ближайшая дата: 
                                <div className={s.date} key={event.dates[event.dates.length - 2]?.start * 1000}>
                                    {customizeDateToYYYYMMDDFormat(event.dates[event.dates.length - 2]?.start  * 1000)}
                                </div>
                            </div>
                        }
                        <div className={s.eventActions}>
                            <Link href={`/eventInfo/${event.id}`}>Посмотреть</Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}