import CustomLoader from '../../../../components-ui/CustomLoader/CustomLoader';
import CustomStepper from '../../../../components-ui/CustomStepper/CustomStepper';
import { IInnerInvites, User } from '../../../../global/interfaces';
import { IUnitedInvitesEvent } from '../../../../global/interfaces/events';
import InnerInvites from '../InnerInvites/InnerInvites';
import OuterInvites from '../OuterInvites/OuterInvites';
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
    else if (loadedStatus) {
        return (
            <div className={s.content}>
                <CustomStepper
                    steps={[
                        { title: "Входящие приглашения", component: 
                            <InnerInvites
                                invites={unitedEventsInfo.innerInvites}    
                                handleDecline={handleDecline}
                                handleWatch={handleWatch}
                                handleVisit={handleVisit}
                            />
                        },
                        { title: "Исходящие приглашения", component: 
                            <OuterInvites
                                invites={unitedEventsInfo.outerInvites}
                                handleWatch={handleWatch}
                                handleVisit={handleVisit}
                            />
                        }
                    ]}
                />
            </div>
        )
    } 
    else {
        return <CustomLoader />
    }
}