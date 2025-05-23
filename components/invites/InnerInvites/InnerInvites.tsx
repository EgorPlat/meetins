import { useTranslation } from "react-i18next";
import { IInnerInvites } from "@/entities";
import { IInnerInviteEvent } from "@/entities/events";
import { baseURL } from "@/global/store/store";
import { customizeDateToYYYYMMDDHHMMFormat } from "@/shared/functions/getDateInYYYYMMDDHHFormat";
import s from "./InnerInvites.module.scss";

interface IInnerInvitesProps {
    invites: IInnerInviteEvent[],
    handleWatch: (eventId: number) => void
    handleDecline: (event: IInnerInvites) => void,
    handleVisit: (login: number) => void
}
export default function InnerInvites(props: IInnerInvitesProps) {

    const invites = props.invites;
    const { t } = useTranslation();

    if (invites?.length === 0) {
        return <div className={s.warning}>{t("У вас пока нет приглашений на мероприятия")}.</div>
    }
    if (invites) {
        return (
            <div className={s.list}>
                {
                    invites.map(invite => (
                        <div className={s.wrapper} key={invite.id}>
                            <div className={s.content}>
                                <div className={s.image}>
                                    <img src={invite?.images[0].image} />
                                </div>
                                <div className={s.mainInfo}>
                                    <div className={s.eventTitle}>Мероприятие: {invite.title}</div>
                                    <div className={s.eventDescription} dangerouslySetInnerHTML={
                                        { __html: invite.description }
                                    }>
                                    </div>
                                    <div className={s.inviteDate}>
                                        <span>Дата приглашения: </span>
                                        <span>{ customizeDateToYYYYMMDDHHMMFormat(invite.inviteInfo.dateOfSending) }</span>
                                    </div>
                                    <div className={s.eventSender}>
                                        <div className={s.eventSenderName}>Отправитель: {invite.inviteInfo.name}</div>
                                        <div className={s.eventSenderAvatar} onClick={() => props.handleVisit(invite.inviteInfo.login)}>
                                            <img className={s.avatar} src={baseURL + invite.inviteInfo.avatar} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.actions}>
                                <button className={s.action} onClick={() => props.handleWatch(invite.id)}>Посмотреть</button>
                                <button className={s.action} onClick={() => props.handleDecline(invite.inviteInfo)}>Отклонить</button>
                            </div> 
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return null;
    }
}