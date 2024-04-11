import { useEffect, useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MeetingsPageView from "./components/MeetingsPageView/MeetingsPageView";
import { currentMeetings, getAllMeetings, setSelectedMeeting } from "../../global/store/meetings_model";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { IMeeting } from "../../global/interfaces/meetings";
import { $user } from "../../global/store/store";

export default function Meetings() {

    const [currentMenu, setCurrentMenu] = useState<number>(1);
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
            <MeetingsPageView
                handleGoToMeetingRoom={handleGoToMeetingRoom}
                currentMeetings={currentMeetings$}
                currentMenu={currentMenu}
                setCurrentMenu={setCurrentMenu}
                authedUser={authedUser$}
            />
        </PageContainer>
    )
}