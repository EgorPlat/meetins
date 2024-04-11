import { customizeDateToYYYYMMDDHHMMFormat } from '../../../../../global/helpers/helper';
import { IMeeting } from '../../../../../global/interfaces/meetings';
import { baseURL } from '../../../../../global/store/store';
import MeetingWrapper from '../MeetingWrapper/MeetingWrapper';
import s from './CompletedMeetings.module.scss';

export default function CompletedMeetings(props: {
    data: IMeeting[],
    handleGoToMeeting: (meeting: IMeeting) => void
}) {
    if (props.data) {
        return (
            <div className={s.completedMeetings}>
                <div className={s.title}>
                    Здесь видна история встреч на которых Вы были:
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