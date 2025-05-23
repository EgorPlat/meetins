
import { IMeeting } from "@/entities/meetings";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import CustomStepper from "@/shared/ui/CustomStepper/CustomStepper";
import dynamic from "next/dynamic";
import s from "./MeetingsContentView.module.scss";

const CompletedMeetings = dynamic(() => import("../CompletedMeetings/CompletedMeetings"), { loading: () => <CustomLoader />, ssr: false });
const FurtherMeetings = dynamic(() => import("../FurtherMeetings/FurtherMeetings"), { loading: () => <CustomLoader />, ssr: false });
const MyMeetings = dynamic(() => import("../MyMeetings/MyMeetings"), { loading: () => <CustomLoader />, ssr: false });

export default function MeetingsContentView(props: {
    completedMeetings: IMeeting[],
    furtherMeetings: IMeeting[],
    myMeetings: IMeeting[],
    handleGoToMeetingRoom: (meetingId: IMeeting) => void,
}) {

    return (
        <div className={s.meetingsContentView}>
            <CustomStepper
                steps={[
                    {
                        title: "Мои встречи",
                        component: MyMeetings,
                        props: { data: props.myMeetings, handleGoToMeeting: props.handleGoToMeetingRoom }
                    },
                    {
                        title: "Будущие встречи",
                        component: FurtherMeetings,
                        props: { data: props.furtherMeetings, handleGoToMeetingRoom: props.handleGoToMeetingRoom }
                    },
                    {
                        title: "Завершенные встречи",
                        component: CompletedMeetings,
                        props: { data: props.completedMeetings, handleGoToMeeting: props.handleGoToMeetingRoom }
                    },
                ]}
            >
            </CustomStepper>
        </div>
    )
}