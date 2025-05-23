"use client";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { currentMeetings, getAllMeetings, setSelectedMeeting } from "@/global/store/meetings_model";
import { IMeeting } from "@/entities/meetings";
import { $user } from "@/global/store/store";
import MeetingsContentView from "@/components/meetings/MeetingsContentView/MeetingsContentView";

export default function Meetings() {

    const currentMeetings$ = useUnit(currentMeetings);
    const authedUser$ = useUnit($user);
    const router = useRouter();

    const furtherMeetings = currentMeetings$.furtherMeetings;
    const completedMeetings = currentMeetings$.previousMeetings;
    const myMeetings = currentMeetings$.furtherMeetings.filter(el => el.creatorId === authedUser$?.userId);

    const handleGoToMeetingRoom = (meeting: IMeeting) => {
        setSelectedMeeting(meeting);
        router.push(`/meetingsRoom/${meeting.meetingId}`);
    };

    useEffect(() => {
        getAllMeetings();
    }, []);

    return (
        <MeetingsContentView
            handleGoToMeetingRoom={handleGoToMeetingRoom}
            furtherMeetings={furtherMeetings}
            myMeetings={myMeetings}
            completedMeetings={completedMeetings}
        />
    )
}