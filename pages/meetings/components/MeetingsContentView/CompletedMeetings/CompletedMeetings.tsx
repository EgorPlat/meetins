import { useTranslation } from "react-i18next";
import { IMeeting } from "../../../../../entities/meetings";
import MeetingWrapper from "../MeetingWrapper/MeetingWrapper";
import s from "./CompletedMeetings.module.scss";

export default function CompletedMeetings(props: {
    data: IMeeting[],
    handleGoToMeeting: (meeting: IMeeting) => void
}) {

    const { t } = useTranslation();

    if (props.data) {
        return (
            <div className={s.completedMeetings}>
                <div className={s.title}>
                    {t("Здесь видна история встреч на которых Вы были")}
                </div>
                <div className={s.meetingsList}>
                    {
                        props.data.map(el => (
                            <MeetingWrapper
                                key={el.title}
                                meeting={el}
                                handleGoToMeeting={props.handleGoToMeeting}
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