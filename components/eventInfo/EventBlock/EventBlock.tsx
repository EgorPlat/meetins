import { useTranslation } from "react-i18next";
import s from "./EventBlock.module.scss";
import Image from "next/image";
import { useUnit } from "effector-react";
import EventMoreInfo from "../EventMoreInfo/EventMoreInfo";
import { IEventComments, IEventInfoCard } from "@/entities/events";
import { JSX } from "react";
import { baseURL, isMobile } from "@/global/store/store";
import CustomSlider from "@/shared/ui/CustomSlider/CustomSlider";
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";

export default function EventBlock(props: {
    currentEventById: IEventInfoCard,
    addUserEvent: (id: number) => void,
    commentsEvent: IEventComments[]
}): JSX.Element {

    const event = props.currentEventById;
    const { t } = useTranslation();
    const isMobile$ = useUnit(isMobile);


    if (event && props.commentsEvent) {
        return (
            <div className={s.eventBlockContent}>
                <div className={s.eventBlockTitle}>{t("Информация про")} {event.title}</div>
                <div className={s.eventBlockMainInfo}>
                    <div className={s.eventInfo}>
                        <CustomSlider
                            autoSwapTime={3000}
                            files={props.currentEventById.images.map((el) => {
                                return {
                                    src: el.image,
                                    type: "image"
                                };
                            })}
                            width={isMobile$ ? "100%" : "85%"}
                            height="300px"
                        />
                    </div>
                    <div className={s.help}>
                        <div>{event.title}, {event.age_restriction}+</div>
                        <div dangerouslySetInnerHTML={{ __html: event.description }} className={s.description} />
                        <EventMoreInfo
                            price={event.price}
                            tags={event.tags}
                            siteUrl={event.site_url}
                            favoritesCount={event.favorites_count}
                        />
                        <div className={s.actions}>
                            <CustomButton onClick={() => props.addUserEvent(event.id)} text={t("Я пойду")!} />
                            <CustomButton text={t("Понравилось")!} />
                        </div>
                    </div>
                </div>
                {props.currentEventById.participants.length > 0 &&
                    <div className={s.rolesTitle}>В ролях: </div>
                }
                <div className={s.actorsInfo}>
                    {
                        props.currentEventById.participants.map(el => (
                            <div className={s.actor} key={el.agent.title}>
                                <div className={s.avatar}>
                                    <img src={baseURL + "/no-avatar.jpg"} className={s.image} />
                                </div>
                                <div className={s.name}>
                                    <a href={el.agent.site_url} target="__blank">{el.agent.title}</a>
                                </div>
                                <div className={s.role}>
                                    {el.role.slu}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={s.commentsWrapper}>
                    {props.commentsEvent.length === 0 ? <p>Отзывов пока нет...</p> : <p>Отзывы ({props.currentEventById.comments_count}) </p>}
                    {
                        props.commentsEvent?.map(comment => (
                            <div className={s.wrapper} key={comment.id}>
                                <div className={s.userInfo}>
                                    {
                                        comment.user?.avatar.length !== 0
                                            ? <Image
                                                className={s.avatar}
                                                src={comment.user?.avatar}
                                                width={50}
                                                height={50}
                                                alt="Avatar"
                                            />
                                            : <Image
                                                className={s.avatar}
                                                src={baseURL + "no-avatar.jpg"}
                                                width={50}
                                                height={50}
                                                alt="Avatar"
                                            />
                                    }
                                </div>
                                <div className={s.commentInfo}>
                                    <div className={s.name}>
                                        {comment.user?.name}
                                    </div>
                                    <div className={s.text}>
                                        {comment.text}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
    return <CustomLoader />;
};
