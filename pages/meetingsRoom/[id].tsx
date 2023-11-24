import { useRouter } from "next/router";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MeetingsRoomPageView from "./MeetingsRoomPageView/MeetingsRoomPageView";

export default function MeetingsRoom() {
    
    const router = useRouter();

    return (
        <PageContainer>
            <MeetingsRoomPageView />
        </PageContainer>
    )
}