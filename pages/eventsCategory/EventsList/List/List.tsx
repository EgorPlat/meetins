import { useRouter } from "next/router";
import { IShortEventInfo } from "../../../../global/interfaces/events";
import Image from "next/image";
import s from './List.module.scss';

export default function List(props: {list: IShortEventInfo[]}): JSX.Element {

    const router = useRouter();
    return (
        <div className={s.list}>
            {
            props.list?.map((event) => 
                <div 
                    className={s.eventBody} 
                    key={event.id}
                    onClick={() => router.push(`/eventInfo/${event.id}`)}
                >
                    <Image
                        layout="responsive"
                        width="100px"
                        height="40px"
                        src={event.images[0].image}
                    />
                    <div className={s.eventDescription}>
                        {event.title}
                        <div>
                            Приблизительная цена: 
                            <button className={event.price.length > 0 ? s.notFree : s.free}>
                                {event.price.length > 0 ? event.price : 'Бесплатно'}
                            </button>
                        </div>
                        <div>Минимальный возраст для посещения: {event.age_restriction}+</div>
                    </div>
                </div>)
            }
        </div>
    )
}