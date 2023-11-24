import { IMeeting, ISplitedMeetings } from '../../../../global/interfaces/meetings';
import CompletedMeetings from './CompletedMeetings/CompletedMeetings';
import FurtherMeetings from './FurtherMeetings/FurtherMeetings';
import s from './MeetingsContentView.module.scss';
import MyMeetings from './MyMeetings/MyMeetings';

export default function MeetingsContentView(props: {
    currentMenu: number,
    currentMeetings: ISplitedMeetings,
    handleGoToMeetingRoom: (meetingId: string) => void
}) {
    return (
        <div className={s.furtherMeetings}>
            { props.currentMenu === 1 && <MyMeetings /> }
            { props.currentMenu === 2 && 
                <FurtherMeetings 
                    data={props.currentMeetings?.furtherMeetings}
                    handleGoToMeetingRoom={props.handleGoToMeetingRoom}
                /> 
            }
            { props.currentMenu === 3 && <CompletedMeetings data={props.currentMeetings?.previousMeetings} /> }
        </div>
    )
}