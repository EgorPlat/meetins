import { useEffect, useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MeetingsPageView from "./components/MeetingsPageView/MeetingsPageView";
import { currentMeetings, getAllMeetings } from "../../global/store/meetings_model";
import { useStore } from "effector-react";

export default function Meetings() {

    const [currentMenu, setCurrentMenu] = useState<number>(1);
    const currentMeetings$ = useStore(currentMeetings);

    useEffect(() => {
        getAllMeetings();
    }, []);
    
    return (
        <PageContainer>
            <MeetingsPageView
                currentMeetings={currentMeetings$}
                currentMenu={currentMenu}
                setCurrentMenu={setCurrentMenu}
            />
        </PageContainer>
    )
}