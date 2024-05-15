import { IShortEventInfo } from "../../../../../global/interfaces/events";
import Image from "next/image";
import s from './List.module.scss';
import Link from "next/link";

export default function List(props: {list: IShortEventInfo[]}): JSX.Element {

    return (
        <div className={s.list}>
            {
            props.list?.map((event) => 
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
                            Приблизительная цена: 
                            <button className={event.price.length > 0 ? s.notFree : s.free}>
                                {event.price.length > 0 ? event.price : 'Бесплатно'}
                            </button>
                        </div>
                        <div className={s.eventAge}>
                            Минимальный возраст для посещения: 
                            <div className={s.age}>{event.age_restriction} лет</div>
                        </div>
                        <div className={s.eventActions}>
                            <Link href={`/eventInfo/${event.id}`}>Посмотреть</Link>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}