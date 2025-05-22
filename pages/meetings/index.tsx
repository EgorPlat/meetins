import { useEffect } from "react";
import { currentMeetings, getAllMeetings, setSelectedMeeting } from "../../global/store/meetings_model";
import { useUnit } from "effector-react";
import { useRouter } from "next/router";
import { IMeeting } from "../../entities/meetings";
import { $user } from "../../global/store/store";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import MeetingsContentView from "./components/MeetingsContentView/MeetingsContentView";

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
        <PageContainer>
            <MeetingsContentView
                handleGoToMeetingRoom={handleGoToMeetingRoom}
                furtherMeetings={furtherMeetings}
                myMeetings={myMeetings}
                completedMeetings={completedMeetings}
            />
        </PageContainer>
    )
}