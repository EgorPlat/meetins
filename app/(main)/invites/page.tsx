"use client";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { IInnerInvites } from "@/entities";
import { unitedInviteEvents, loadedStatus, declineInnerInvite, getUserInnerInvitesEventInfo, getUserOuterInvitesEventInfo } from "@/global/store/events_model";
import { useRouter } from "next/navigation";
import InvitesPageView from "@/components/invites/InvitesPageView/InvitesPageView";

export default function Invites() {

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
        <InvitesPageView
            handleWatch={handleWatch}
            handleDecline={handleDecline}
            handleVisit={handleVisit}
            unitedEventsInfo={unitedEventsInfo$}
            loadedStatus={loadedStatus$}
        />
    )
}