import { useStore } from "effector-react";
import { useEffect } from "react";
import { 
    getUserInnerInvitesEventInfo, 
    unitedInviteEvents,
    getUserOuterInvitesEventInfo 
} from "../../global/store/events_model";
import { $user } from "../../global/store/store";
import PageContainer from "../../components/pageContainer/pageContainer";
import InvitesPageView from "./components/InvitesPageView/InvitesPageView";

export default function Invites() {

    const authedUser$ = useStore($user);
    const unitedEventsInfo$ = useStore(unitedInviteEvents);

    useEffect(() => {
        getUserInnerInvitesEventInfo();
        getUserOuterInvitesEventInfo();
    }, [])

    return (
        <PageContainer>
            <InvitesPageView
                authedUser={authedUser$}
                unitedEventsInfo={unitedEventsInfo$}
            />
        </PageContainer>
    )
}