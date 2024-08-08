import CustomLoader from '../../../../components-ui/CustomLoader/CustomLoader';
import { IInnerInvites, User } from '../../../../global/interfaces';
import { IUnitedInvitesEvent } from '../../../../global/interfaces/events';
import InnerInviteWrapper from '../InnerInviteWrapper/InnerInviteWrapper';
import OuterInviteWrapper from '../OuterInviteWrapper/OuterInviteWrapper';
import s from './InvitesPageView.module.scss';

interface IInvitesPageView {
    authedUser: User,
    unitedEventsInfo: IUnitedInvitesEvent,
    loadedStatus: boolean,
    handleWatch: (eventId: number) => void,
    handleDecline: (event: IInnerInvites) => void,
    handleVisit: (login: number) => void
}
export default function InvitesPageView({ 
    authedUser, 
    handleWatch, 
    loadedStatus,
    unitedEventsInfo, 
    handleDecline,
    handleVisit
}: IInvitesPageView) {

    if (!loadedStatus) {
        return (
            <CustomLoader />
        )
    }
    else if (loadedStatus && unitedEventsInfo.innerInvites.length === 0 && unitedEventsInfo.outerInvites.length === 0) {
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
                    unitedEventsInfo.innerInvites.map((invite) => 
                    <InnerInviteWrapper 
                        invite={invite}    
                        key={invite.id}
                        handleDecline={handleDecline}
                        handleWatch={handleWatch}
                        handleVisit={handleVisit}
                    />)
                }
                {
                    unitedEventsInfo.outerInvites.map((invite) => 
                    <OuterInviteWrapper 
                        invite={invite} 
                        key={invite.id}
                        handleWatch={handleWatch}
                        handleVisit={handleVisit}
                    />)
                }
            </div>
        )
    } 
    else {
        return <CustomLoader />
    }
}