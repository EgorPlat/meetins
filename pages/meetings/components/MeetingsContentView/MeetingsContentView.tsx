import CompletedMeetings from './CompletedMeetings/CompletedMeetings';
import FurtherMeetings from './FurtherMeetings/FurtherMeetings';
import s from './MeetingsContentView.module.scss';
import MyMeetings from './MyMeetings/MyMeetings';

export default function MeetingsContentView(props: {
    currentMenu: number
}) {
    return (
        <div className={s.furtherMeetings}>
            { props.currentMenu === 1 && <MyMeetings /> }
            { props.currentMenu === 2 && <FurtherMeetings /> }
            { props.currentMenu === 3 && <CompletedMeetings /> }
        </div>
    )
}