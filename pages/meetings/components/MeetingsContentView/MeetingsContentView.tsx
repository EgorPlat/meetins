import { User } from '../../../../global/interfaces';
import { IMeeting, ISplitedMeetings } from '../../../../global/interfaces/meetings';
import CompletedMeetings from './CompletedMeetings/CompletedMeetings';
import FurtherMeetings from './FurtherMeetings/FurtherMeetings';
import s from './MeetingsContentView.module.scss';
import MyMeetings from './MyMeetings/MyMeetings';

export default function MeetingsContentView(props: {
    currentMenu: number,
    currentMeetings: ISplitedMeetings,
    authedUser: User,
    handleGoToMeetingRoom: (meetingId: IMeeting) => void,
}) {
    const myMeetings = props.currentMeetings?.furtherMeetings.filter(el => el.creatorId === props.authedUser?.userId);  
    
    return (
        <div className={s.furtherMeetings}>
            { props.currentMenu === 1 && 
            <MyMeetings 
                data={myMeetings} 
                handleGoToMeeting={props.handleGoToMeetingRoom} 
            /> }
            { props.currentMenu === 2 && 
                <FurtherMeetings 
                    data={props.currentMeetings?.furtherMeetings}
                    handleGoToMeetingRoom={props.handleGoToMeetingRoom}
                /> 
            }
            { props.currentMenu === 3 && 
                <CompletedMeetings 
                    data={props.currentMeetings?.previousMeetings}
                    handleGoToMeeting={props.handleGoToMeetingRoom}
                /> }
        </div>
    )
}