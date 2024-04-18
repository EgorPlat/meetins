import { customizeDateToYYYYMMDDHHMMFormat } from "../../../../../global/helpers/helper";
import { IMeeting } from "../../../../../global/interfaces/meetings";
import { baseURL } from "../../../../../global/store/store";
import s from "./MeetingWrapper.module.scss";

export default function MeetingWrapper(props: {
    meeting: IMeeting,
    handleGoToMeeting: (meeting: IMeeting) => void
}) {
    return (
        <div className={s.meetingWrapper} key={String(props.meeting?.date)}>
            <div 
                className={s.meetingImage}
                style={{backgroundImage: `url(${baseURL + props.meeting?.preview})`}}
            >
            </div>
            <div className={s.meetingDescription}>
                <div className={s.meetingTitle}>
                    <div>Заголовок встречи: {props.meeting?.title},</div>
                    <div className={s.date}>{props.meeting?.address}</div>
                </div>
                <div className={s.meetingCreator}>
                    Организатор встречи: {props.meeting?.participants[0].name}
                </div>
                <div className={s.meetingDate}>
                    Планируемая дата встречи: 
                    <span className={s.dateTime}> {customizeDateToYYYYMMDDHHMMFormat(String(props.meeting?.date))}</span>
                </div>
                <div className={s.meetingGoal}>
                    Цель встречи: <span className={s.hint}>{props.meeting?.goal}</span>
                </div>
                <div className={s.meetingActions}>
                    <button 
                        className={s.actionBtn}
                        onClick={() => props.handleGoToMeeting(props.meeting)}
                    >Перейти</button>
                    <button className={s.actionBtn}>Связаться с организатором</button>
                </div>
            </div>
        </div>        
    )
}