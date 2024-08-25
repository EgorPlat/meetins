import { useStore } from "effector-react";
import { customizeDateToYYYYMMDDHHMMFormat } from "../../../../../global/helpers/helper";
import { IMeeting } from "../../../../../global/interfaces/meetings";
import { baseURL, isMobile } from "../../../../../global/store/store";
import s from "./MeetingWrapper.module.scss";
import CustomTimer from "../../../../../global/components-ui/CustomTimer/CustomTimer";
import Link from "next/link";

export default function MeetingWrapper(props: {
    meeting: IMeeting,
    handleGoToMeeting: (meeting: IMeeting) => void
}) {

    const isMobile$ = useStore(isMobile);
    const isMeetingEnded = new Date(props.meeting?.date) <= new Date();
    const meetingCreator = props.meeting?.participants.filter(el => el.userId === props.meeting.creatorId)[0];

    if (isMobile$) {
        return (
            <div className={s.meetingMobileWrapper} key={String(props.meeting?.date)}>
                <div className={s.meetingDescription}>
                    <div className={s.meetingTitle}>
                        <div className={s.title}>
                            {props.meeting?.title}
                        </div>
                        <div
                            className={s.meetingImage}
                            style={{backgroundImage: `url(${baseURL + props.meeting?.preview})`}}
                        >
                        </div>
                    </div>
                    <div className={s.meetingCreator}>
                        <span>Организатор: </span>
                        {
                            meetingCreator && 
                            <>
                                <img src={baseURL + meetingCreator?.avatar} width="25px" height="25px" />
                                <Link href={`/profile/${meetingCreator?.login}`}>
                                    {meetingCreator?.name}
                                </Link>
                            </>
                        }
                    </div>
                    <div className={s.meetingDate}>
                        <span>Дата проведения: </span>
                        <span className={s.dateTime}> 
                            {
                                customizeDateToYYYYMMDDHHMMFormat(String(props.meeting?.date))
                            }
                        </span>
                    </div>
                    <div className={s.meetingTimer}>
                        Будет доступна:
                        {
                            !isMeetingEnded
                                ? <CustomTimer 
                                    dateTo={props.meeting?.date} 
                                    dateFrom={Date.now()}
                                    color="black"
                                    backgroundColor="#73fa97"
                                />
                                : <span className={s.meetingOver}>Завершилась</span>
                        }
                    </div>
                    <div className={s.date}>{props.meeting?.address}</div>
                    <div className={s.meetingGoal}>
                        Цель встречи: <span className={s.hint}>{props.meeting?.goal}</span>
                    </div>
                    <div className={s.meetingActions}>
                        <button 
                            className={s.actionBtn}
                            onClick={() => props.handleGoToMeeting(props.meeting)}
                        >Перейти</button>
                        <button className={s.actionBtn}>Связь с организатором</button>
                    </div>
                </div>
            </div>        
        )
    } else {
        return (
            <div className={s.meetingWrapper} key={String(props.meeting?.date)}>
                <div 
                    className={s.meetingImage}
                    style={{backgroundImage: `url(${baseURL + props.meeting?.preview})`}}
                >
                </div>
                <div className={s.meetingDescription}>
                    <div className={s.meetingTitle}>
                        <div>{props.meeting?.title}</div>
                        <div className={s.date}>{props.meeting?.address}</div>
                    </div>
                    <div className={s.meetingCreator}>
                        <span>Организатор: </span>
                        {
                            meetingCreator && 
                            <>
                                <img src={baseURL + meetingCreator?.avatar} width="25px" height="25px" />
                                <Link href={`/profile/${meetingCreator?.login}`}>
                                    {meetingCreator?.name}
                                </Link>
                            </>
                        }
                    </div>
                    <div className={s.meetingDate}>
                        Дата проведения: 
                        <span className={s.dateTime}> {customizeDateToYYYYMMDDHHMMFormat(String(props.meeting?.date))}</span>
                    </div>
                    <div className={s.meetingTimer}>
                        Будет доступна:
                        {
                            !isMeetingEnded
                                ? <CustomTimer 
                                    dateTo={props.meeting?.date} 
                                    dateFrom={Date.now()}
                                    color="black"
                                    backgroundColor="#73fa97"
                                />
                                : <span className={s.meetingOver}>Завершилась</span>
                        }
                    </div>
                    <div className={s.meetingGoal}>
                        Цель встречи: <span className={s.hint}>{props.meeting?.goal}</span>
                    </div>
                    {
                        !isMeetingEnded &&
                        <div className={s.meetingActions}>
                            <button 
                                className={s.actionBtn}
                                onClick={() => props.handleGoToMeeting(props.meeting)}
                            >Перейти на страницу встречи</button>
                        </div>
                    }
                </div>
            </div>        
        )
    }
}