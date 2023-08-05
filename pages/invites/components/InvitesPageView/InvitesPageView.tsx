import CustomLoader from '../../../../components-ui/CustomLoader/CustomLoader';
import { User } from '../../../../global/interfaces';
import { IUnitedInvitesEvent } from '../../../../global/interfaces/events';
import InnerInviteWrapper from '../InnerInviteWrapper/InnerInviteWrapper';
import OuterInviteWrapper from '../OuterInviteWrapper/OuterInviteWrapper';
import s from './InvitesPageView.module.scss';

interface IInvitesPageView {
    authedUser: User,
    unitedEventsInfo: IUnitedInvitesEvent,
    loadedStatus: boolean
}
export default function InvitesPageView({ authedUser, loadedStatus, unitedEventsInfo }: IInvitesPageView) {
    if (loadedStatus && unitedEventsInfo.innerInvites.length === 0) {
        return (
            <div className={s.invitesPageView}>
                <h5>У вас пока нет приглашений на мероприятия</h5>
            </div>
        )
    }
    else if (loadedStatus) {
        return (
            <div className={s.invitesPageView}>
                {
                    unitedEventsInfo.innerInvites.map((invite) => <InnerInviteWrapper invite={invite} key={invite.id} />)
                }
                {
                    unitedEventsInfo.outerInvites.map((invite) => <OuterInviteWrapper invite={invite} key={invite.id} />)
                }
            </div>
        )
    } 
    else {
        return <CustomLoader />
    }
}