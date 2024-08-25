import CustomStepper from "../../../../global/components-ui/CustomStepper/CustomStepper";
import { User } from "../../../../global/interfaces";
import { IMeeting } from "../../../../global/interfaces/meetings";
import CompletedMeetings from "./CompletedMeetings/CompletedMeetings";
import FurtherMeetings from "./FurtherMeetings/FurtherMeetings";
import MyMeetings from "./MyMeetings/MyMeetings";
import s from "./MeetingsContentView.module.scss";

export default function MeetingsContentView(props: {
    completedMeetings: IMeeting[],
    furtherMeetings: IMeeting[],
    myMeetings: IMeeting[],
    authedUser: User,
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