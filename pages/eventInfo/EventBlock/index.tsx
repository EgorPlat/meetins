import Loader from "../../../components/Loader/Loader";
import { IEventInfoCard } from "../../../global/interfaces/events";
import s from "./eventBlock.module.scss";


export default function EventBlock(props: {
    currentEventById: IEventInfoCard
}): JSX.Element { 
    const event = props.currentEventById;
	if (event) {
        return(
            <div className={s.eventBlockContent}>
                <div className={s.eventBlockTitle}>Информация про {event.title}</div>
                <div className={s.eventBlockMainInfo}>
                    <div className={s.image}>
                        
                    </div>
                    <div className={s.help}>
                        <div>{event.title}, {event.age_restriction}+</div>
                        <div dangerouslySetInnerHTML={{ __html: event.description }} />
                    </div>
                </div>
            </div>
        )
    }
    return <Loader />;
};
