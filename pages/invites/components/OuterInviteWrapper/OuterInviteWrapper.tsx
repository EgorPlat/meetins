import { IOuterInviteEvent } from "../../../../global/interfaces/events";
import { baseURL } from "../../../../global/store/store";
import s from './OuterInviteWrapper.module.scss';

interface IOuterInviteWrapperProps {
    invite: IOuterInviteEvent,
    handleWatch: (eventId: number) => void,
    handleVisit: (login: number) => void
}
export default function OuterInviteWrapper(props: IOuterInviteWrapperProps) {
    const invite = props.invite;
    const inviteInfo = invite?.inviteInfo;
    
    if (invite && inviteInfo) {
        return (
            <div className={s.wrapper}>
                <div className={s.title}>Исходящее приглашение</div> 
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
                            Отправлено к:
                            {
                                inviteInfo.invitedUsers.map(user => (                                    
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
        )
    } else {
        return null;
    }
}