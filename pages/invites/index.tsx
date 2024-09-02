import { useUnit } from "effector-react";
import { useEffect } from "react";
import {
    getUserInnerInvitesEventInfo,
    unitedInviteEvents,
    getUserOuterInvitesEventInfo,
    loadedStatus,
    declineInnerInvite
} from "../../global/store/events_model";
import { $user } from "../../global/store/store";
import { useRouter } from "next/router";
import { IInnerInvites } from "../../entities";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import InvitesPageView from "./components/InvitesPageView/InvitesPageView";
import React from "react";

export default function Invites() {

    const authedUser$ = useUnit($user);
    const unitedEventsInfo$ = useUnit(unitedInviteEvents);
    const loadedStatus$ = useUnit(loadedStatus);
    const router = useRouter();

    const handleWatch = (eventId: number) => {
        router.push(`/eventInfo/${eventId}`);
    };

    const handleDecline = (event: IInnerInvites) => {
        declineInnerInvite(event);
    };

    const handleVisit = (login: number) => {
        router.push(`/profile/${login}`);
    };

    useEffect(() => {
        getUserInnerInvitesEventInfo();
        getUserOuterInvitesEventInfo();
    }, []);

    return (
        <PageContainer>
            <InvitesPageView
                handleWatch={handleWatch}
                handleDecline={handleDecline}
                handleVisit={handleVisit}
                authedUser={authedUser$}
                unitedEventsInfo={unitedEventsInfo$}
                loadedStatus={loadedStatus$}
            />
        </PageContainer>
    )
}