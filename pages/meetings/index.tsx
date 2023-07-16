import { useState } from "react";
import PageContainer from "../../components/PageContainer/pageContainer";
import MeetingsPageView from "./components/MeetingsPageView/MeetingsPageView";

export default function Meetings() {

    const [currentMenu, setCurrentMenu] = useState<number>(1);
    
    return (
        <PageContainer>
            <MeetingsPageView
                currentMenu={currentMenu}
                setCurrentMenu={setCurrentMenu}
            />
        </PageContainer>
    )
}