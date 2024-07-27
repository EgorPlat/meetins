import { useEffect } from "react";
import { currentMeetings, getAllMeetings, setSelectedMeeting } from "../../global/store/meetings_model";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { IMeeting } from "../../global/interfaces/meetings";
import { $user } from "../../global/store/store";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MeetingsContentView from "./components/MeetingsContentView/MeetingsContentView";

export default function Meetings() {

    const currentMeetings$ = useStore(currentMeetings);
    const authedUser$ = useStore($user);
    const router = useRouter();

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
                currentMeetings={currentMeetings$}
                authedUser={authedUser$}
            />
        </PageContainer>
    )
}