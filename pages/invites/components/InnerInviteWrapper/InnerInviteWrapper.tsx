import { IInnerInvites } from "../../../../global/interfaces";
import { IInnerInviteEvent } from "../../../../global/interfaces/events";
import { baseURL } from "../../../../global/store/store";
import s from './InnerInviteWrapper.module.scss';

interface IInnerInviteWrapperProps {
    invite: IInnerInviteEvent,
    handleWatch: (eventId: number) => void
    handleDecline: (event: IInnerInvites) => void,
    handleVisit: (login: number) => void
}
export default function InnerInviteWrapper(props: IInnerInviteWrapperProps) {
    const invite = props.invite;
    const inviteInfo = invite?.inviteInfo;

    if (invite && inviteInfo) {
        return (
            <div className={s.wrapper}>
                <div className={s.title}>Входящее приглашение</div> 
                <div className={s.content}>
                    <div className={s.image}>
                        <img src={invite?.images[0].image} />
                    </div>
                    <div className={s.mainInfo}>
                        <div className={s.eventTitle}>Мероприятие: {invite.title}</div>
                        <div className={s.eventDescription} dangerouslySetInnerHTML={
                            {__html: invite.description}
                        }>
                        </div>
                        <div className={s.eventSender}>
                            <div className={s.eventSenderName}>Отправитель: {inviteInfo.name}</div>
                            <div className={s.eventSenderAvatar} onClick={() => props.handleVisit(inviteInfo.login)}>
                                <img className={s.avatar} src={baseURL + inviteInfo.avatar} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.actions}>
                    <button className={s.action} onClick={() => props.handleWatch(invite.id)}>Посмотреть</button>
                    <button className={s.action} onClick={() => props.handleDecline(inviteInfo)}>Отклонить</button>
                </div> 
            </div>
        )
    } else {
        return null;
    }
}