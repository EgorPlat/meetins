import { useTranslation } from "react-i18next";
import { IMeeting } from "@/entities/meetings";
import MeetingWrapper from "../MeetingWrapper/MeetingWrapper";
import s from "./FurtherMeetings.module.scss";

export default function FurtherMeetings(props: {
    data: IMeeting[],
    handleGoToMeetingRoom: (meeting: IMeeting) => void
}) {

    const { t } = useTranslation();
    
    if (props.data) {
        return (
            <div className={s.completedMeetings}>
                <div className={s.title}>
                    {t("Здесь видны встречи, на которые можно записаться")}
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