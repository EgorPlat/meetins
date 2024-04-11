import { IMeeting } from '../../../../../global/interfaces/meetings';
import { baseURL } from '../../../../../global/store/store';
import s from './FurtherMeetings.module.scss';
import { customizeDateToYYYYMMDDHHMMFormat } from '../../../../../global/helpers/helper';
import MeetingWrapper from '../MeetingWrapper/MeetingWrapper';

export default function FurtherMeetings(props: {
    data: IMeeting[],
    handleGoToMeetingRoom: (meeting: IMeeting) => void
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