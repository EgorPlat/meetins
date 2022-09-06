import { useRouter } from "next/router";
import { IShortEventInfo } from "../../../../global/interfaces/events";
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
                style={{backgroundImage: `url(${event.images[0].image})`}}
                onClick={() => router.push(`/eventInfo/${event.id}`)}
                >
                    <div className={s.eventTitle}>
                        {event.title}
                    </div>
                    <div className={s.eventDescription}>
                        {event.id}
                    </div>
                </div>)
            }
        </div>
    )
}