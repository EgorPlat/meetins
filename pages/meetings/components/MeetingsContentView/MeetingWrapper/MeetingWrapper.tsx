import { useUnit } from "effector-react";
import { customizeDateToYYYYMMDDHHMMFormat } from "../../../../../shared/functions/getDateInYYYYMMDDHHFormat";
import { IMeeting } from "../../../../../entities/meetings";
import { baseURL, isMobile } from "../../../../../global/store/store";
import s from "./MeetingWrapper.module.scss";
import CustomTimer from "../../../../../shared/ui/CustomTimer/CustomTimer";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import CustomButton from "../../../../../shared/ui/CustomButton/CustomButton";

export default function MeetingWrapper(props: {
    meeting: IMeeting,
    handleGoToMeeting: (meeting: IMeeting) => void
}) {

    const isMobile$ = useUnit(isMobile);
    const isMeetingEnded = new Date(props.meeting?.date) <= new Date();
    const meetingCreator = props.meeting?.participants.filter(el => el.userId === props.meeting.creatorId)[0];
    const { t } = useTranslation();

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
                            style={{ backgroundImage: `url(${baseURL + props.meeting?.preview})` }}
                        >
                        </div>
                    </div>
                    <div className={s.meetingCreator}>
                        <span>{t("Организатор")}: </span>
                        {
                            meetingCreator && 
                            <>
                                <img className={s.creatorMeeting} src={baseURL + meetingCreator?.avatar} width="25px" height="25px" />
                                <Link href={`/profile/${meetingCreator?.login}`}>
                                    {meetingCreator?.name}
                                </Link>
                            </>
                        }
                    </div>
                    <div className={s.meetingDate}>
                        <span>{t("Дата проведения")}: </span>
                        <span className={s.dateTime}> 
                            {
                                customizeDateToYYYYMMDDHHMMFormat(String(props.meeting?.date))
                            }
                        </span>
                    </div>
                    <div className={s.meetingTimer}>
                        {t("Будет доступна")}:
                        {
                            !isMeetingEnded
                                ? <CustomTimer 
                                    dateTo={props.meeting?.date} 
                                    dateFrom={Date.now()}
                                    color="white"
                                    backgroundColor="rgba(175, 0, 175, 0.559)"
                                />
                                : <span className={s.meetingOver}>{t("Завершилась")}</span>
                        }
                    </div>
                    <div className={s.meetingAddress}>{t("Адрес")}: {props.meeting?.address}</div>
                    <div className={s.meetingGoal}>
                        {t("Цель встречи")}: <span className={s.hint}>{props.meeting?.goal}</span>
                    </div>
                    <div className={s.meetingActions}>
                        {
                            !isMeetingEnded &&
                            <CustomButton 
                                text={t("Перейти на страницу встречи")}
                                onClick={() => props.handleGoToMeeting(props.meeting)}
                            />
                        }
                    </div>
                </div>
            </div>        
        )
    } else {
        return (
            <div className={s.meetingWrapper} key={String(props.meeting?.date)}>
                <div 
                    className={s.meetingImage}
                    style={{ backgroundImage: `url(${baseURL + props.meeting?.preview})` }}
                >
                </div>
                <div className={s.meetingDescription}>
                    <div className={s.meetingTitle}>
                        <div>{props.meeting?.title}</div>
                        <div className={s.address}>{props.meeting?.address}</div>
                    </div>
                    <div className={s.meetingCreator}>
                        <span>{t("Организатор")}: </span>
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
                        {t("Дата проведения")}: 
                        <span className={s.dateTime}> {customizeDateToYYYYMMDDHHMMFormat(String(props.meeting?.date))}</span>
                    </div>
                    <div className={s.meetingTimer}>
                        {t("Будет доступна")}:
                        {
                            !isMeetingEnded
                                ? <CustomTimer 
                                    dateTo={props.meeting?.date} 
                                    dateFrom={Date.now()}
                                    color="white"
                                    backgroundColor="rgba(175, 0, 175, 0.559)"
                                />
                                : <span className={s.meetingOver}>{t("Завершилась")}</span>
                        }
                    </div>
                    <div className={s.meetingGoal}>
                        {t("Цель встречи")}: <span className={s.hint}>{props.meeting?.goal}</span>
                    </div>
                    <div className={s.meetingActions}>
                        {
                            !isMeetingEnded &&
                            <CustomButton 
                                text={t("Перейти на страницу встречи")}
                                onClick={() => props.handleGoToMeeting(props.meeting)}
                            />
                        }
                    </div>
                </div>
            </div>        
        )
    }
}