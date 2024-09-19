import { useTranslation } from "react-i18next";
import { IOuterInviteEvent } from "../../../../entities/events";
import { baseURL } from "../../../../global/store/store";
import s from "./OuterInvites.module.scss";

interface IOuterInviteWrapperProps {
    invites: IOuterInviteEvent[],
    handleWatch: (eventId: number) => void,
    handleVisit: (login: number) => void
}
export default function OuterInvites(props: IOuterInviteWrapperProps) {

    const invites = props.invites;
    const { t } = useTranslation();

    if (invites?.length === 0) {
        return <div className={s.warning}>{t("Вы пока не отправляли приглашений")}.</div>
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
                                    <div className={s.eventTitle}>{t("Мероприятие")}: {invite.title}</div>
                                    <div className={s.eventDescription} dangerouslySetInnerHTML={
                                        {__html: invite.description}
                                    }>
                                    </div>
                                    <div className={s.eventSender}>
                                        {t("Отправлено к")}:
                                        {
                                            invite.inviteInfo.invitedUsers.map(user => (                                    
                                                <div key={user.login}>
                                                    <div className={s.eventSenderAvatar} onClick={() => props.handleVisit(user.login)}>
                                                        <img className={s.avatar} src={baseURL + user.avatar} />
                                                    </div>
                                                    <div className={s.eventSenderName}>
                                                        <span>{user.name}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={s.actions}>
                                <button className={s.action} onClick={() => props.handleWatch(invite.id)}>Посмотреть</button>
                                <button className={s.action}>Отозвать приглашения</button>
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