import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader/Loader";
import { IEventInfoCard } from "../../../global/interfaces/events";
import s from "./eventBlock.module.scss";
import CustomSlider from "../../../components/CustomSlider/CustomSlider";
import EventMoreInfo from "../EventMoreInfo";


export default function EventBlock(props: {
    currentEventById: IEventInfoCard,
    addUserEvent: (id: number) => void,
}): JSX.Element {
    const event = props.currentEventById;
    const { t } = useTranslation();
    
	if (event) {
        return(
            <div className={s.eventBlockContent}>
                <div className={s.eventBlockTitle}>{t('Информация про')} {event.title}</div>
                <div className={s.eventBlockMainInfo}>
                    <div className={s.eventInfo}>
                        <CustomSlider 
                            images={props.currentEventById.images}
                            width="300px"
                            height="300px"
                        />
                    </div>
                    <div className={s.help}>
                        <div>{event.title}, {event.age_restriction}+</div>
                        <div dangerouslySetInnerHTML={{ __html: event.description }} />
                        <EventMoreInfo 
                            price={event.price}
                            tags={event.tags}
                            siteUrl={event.site_url}
                            favoritesCount={event.favorites_count}
                        />
                        <div className={s.actions}>
                            <button onClick={() => props.addUserEvent(event.id)}>{t('Я пойду')}!</button>
                            <button>{t('Понравилось')}!</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <Loader />;
};
