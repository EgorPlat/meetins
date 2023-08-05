import { useStore } from "effector-react";
import { useEffect } from "react";
import { 
    getUserInnerInvitesEventInfo, 
    unitedInviteEvents,
    getUserOuterInvitesEventInfo, 
    loadedStatus
} from "../../global/store/events_model";
import { $user } from "../../global/store/store";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import InvitesPageView from "./components/InvitesPageView/InvitesPageView";

export default function Invites() {

    const authedUser$ = useStore($user);
    const unitedEventsInfo$ = useStore(unitedInviteEvents);
    const loadedStatus$ = useStore(loadedStatus);

    useEffect(() => {
        getUserInnerInvitesEventInfo();
        //getUserOuterInvitesEventInfo();
    }, [])

    return (
        <PageContainer>
            <InvitesPageView
                authedUser={authedUser$}
                unitedEventsInfo={unitedEventsInfo$}
                loadedStatus={loadedStatus$}
            />
        </PageContainer>
    )
}