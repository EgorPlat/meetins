import ConfirmAndCancelActions from '../../../../global/helpers/ConfirmAndCancelActions/ConfirmAndCancelActions';
import { customizeDateToYYYYMMDDFormat } from '../../../../global/helpers/helper';
import { User } from '../../../../global/interfaces';
import { baseURL } from '../../../../global/store/store';
import s from './InvitesPageView.module.scss';

interface IInvitesPageView {
    authedUser: User
}
export default function InvitesPageView({ authedUser }: IInvitesPageView) {
    if (authedUser) {
        return (
            <div className={s.invitesPageView}>
                <h4>Входящие приглашения</h4>
                <div className={s.innerInvites}>
                    {
                        authedUser.innerInvites.length !== 0
                        ? authedUser.innerInvites.map(invite => (
                            <div className={s.eachInnerInvite}>
                                <div className={s.eventInfoZone}>
                                    <div>{invite.eventId}</div>
                                </div>
                                <div className={s.senderInfo}>
                                    <div className={s.avatar}>
                                        <img src={baseURL + invite.avatar} width="50px" height="50px" />
                                    </div>
                                    <div className={s.name}>{invite.name}</div>
                                    <div className={s.date}>{customizeDateToYYYYMMDDFormat(invite.dateOfSending)}</div>
                                    <div className={s.status}>{invite.status ? "Принято" : "Пока не принято"}</div>
                                    <div className={s.actions}>
                                        <ConfirmAndCancelActions />
                                    </div>
                                </div>
                            </div>
                        ))
                        : <span className={s.hint}>Пока никто Вас не пригласил.</span>
                    }
                </div>
                <h4>Исходящие приглашения</h4>
                <div className={s.outerInvites}>
                    {
                        authedUser.outerInvites.length !== 0
                        ? authedUser.outerInvites.map(invite => (
                            <div className={s.eachOuterInvite}>
                                <div className={s.event}>{invite.eventId}</div>
                                {
                                        invite.invitedUsers.map((user) => 
                                            <div className={s.userLists}>
                                                <div className={s.avatar}>
                                                    <img src={baseURL + user.avatar} width="50px" height="50px" />
                                                </div>
                                                <div className={s.name}>{user.name}</div>
                                                <div className={s.date}>{customizeDateToYYYYMMDDFormat(user.dateOfSending)}</div>
                                                <div className={s.status}>{user.status ? "Принято" : "Пока не принято"}</div>
                                            </div>
                                        )
                                    }
                            </div>
                        ))
                        : <span className={s.hint}>Вы пока никого не пригласили.</span>
                    }
                </div>
            </div>
        )
    } else {
        return null;
    }
}