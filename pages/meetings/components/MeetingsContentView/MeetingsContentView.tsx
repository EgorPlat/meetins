import CustomStepper from '../../../../components-ui/CustomStepper/CustomStepper';
import { User } from '../../../../global/interfaces';
import { IMeeting, ISplitedMeetings } from '../../../../global/interfaces/meetings';
import CompletedMeetings from './CompletedMeetings/CompletedMeetings';
import FurtherMeetings from './FurtherMeetings/FurtherMeetings';
import MyMeetings from './MyMeetings/MyMeetings';
import s from './MeetingsContentView.module.scss';

export default function MeetingsContentView(props: {
    currentMeetings: ISplitedMeetings,
    authedUser: User,
    handleGoToMeetingRoom: (meetingId: IMeeting) => void,
}) {
    const myMeetings = props.currentMeetings?.furtherMeetings.filter(el => el.creatorId === props.authedUser?.userId);  
    const furtherMeetings = props.currentMeetings?.furtherMeetings;
    const completedMeetings = props.currentMeetings?.previousMeetings;

    return (
        <div className={s.meetingsContentView}>
            <CustomStepper
                steps={[
                    { 
                        title: "Мои встречи", 
                        component: <MyMeetings data={myMeetings} handleGoToMeeting={props.handleGoToMeetingRoom} /> 
                    },
                    { 
                        title: "Будущие встречи", 
                        component: <FurtherMeetings data={furtherMeetings} handleGoToMeetingRoom={props.handleGoToMeetingRoom} /> 
                    },
                    { 
                        title: "Завершенные встречи", 
                        component: <CompletedMeetings data={completedMeetings} handleGoToMeeting={props.handleGoToMeetingRoom} /> 
                    },
                ]}
            >
            </CustomStepper>
        </div>
    )
}