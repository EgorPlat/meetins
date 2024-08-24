import { IMeeting } from "../../../../../global/interfaces/meetings";
import s from "./FurtherMeetings.module.scss";
import MeetingWrapper from "../MeetingWrapper/MeetingWrapper";

export default function FurtherMeetings(props: {
    data: IMeeting[],
    handleGoToMeetingRoom: (meeting: IMeeting) => void
}) {
    if (props.data) {
        return (
            <div className={s.completedMeetings}>
                <div className={s.title}>
                    Здесь видны активные встречи, на которые можно записаться
                </div>
                <div className={s.meetingsList}>
                    {
                        props.data.map(el => (
                            <MeetingWrapper
                                key={el.title}
                                meeting={el}
                                handleGoToMeeting={props.handleGoToMeetingRoom}
                            />
                        ))
                    }
                </div>
            </div>
        )
    } else {
        return null;
    }
}