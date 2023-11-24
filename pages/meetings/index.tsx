import { useEffect, useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MeetingsPageView from "./components/MeetingsPageView/MeetingsPageView";
import { currentMeetings, getAllMeetings } from "../../global/store/meetings_model";
import { useStore } from "effector-react";
import { useRouter } from "next/router";

export default function Meetings() {

    const [currentMenu, setCurrentMenu] = useState<number>(1);
    const currentMeetings$ = useStore(currentMeetings);
    const router = useRouter();

    const handleGoToMeetingRoom = (meetingId: string) => {
        router.push(`/meetingsRoom/${meetingId}`);
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
            />
        </PageContainer>
    )
}