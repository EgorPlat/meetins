import { MeetingsContent } from '../../../../global/constants';
import { User } from '../../../../global/interfaces';
import { IMeeting, ISplitedMeetings } from '../../../../global/interfaces/meetings';
import MeetingsContentView from '../MeetingsContentView/MeetingsContentView';
import s from './MeetingsPageView.module.scss';

export default function MeetingsPageView(props: {
    currentMenu: number,
    currentMeetings: ISplitedMeetings,
    authedUser: User,
    setCurrentMenu: (menuId: number) => void,
    handleGoToMeetingRoom: (meeting: IMeeting) => void
}) {
    return (
        <div className={s.meetings}>
            <div className={s.description}>
                { MeetingsContent.description }
            </div>
            <div className={s.actions}>
                <div 
                    className={props.currentMenu === 1 ? s.activeActionMenu : s.actionMenu}
                    onClick={() => props.setCurrentMenu(1)}
                >
                    Мои встречи
                </div>
                <div 
                    className={props.currentMenu === 2 ? s.activeActionMenu : s.actionMenu}
                    onClick={() => props.setCurrentMenu(2)}
                >
                    Будущие встречи ({ props.currentMeetings?.furtherMeetings.length })
                </div>
                <div 
                    className={props.currentMenu === 3 ? s.activeActionMenu : s.actionMenu}
                    onClick={() => props.setCurrentMenu(3)}
                >
                    Завершенные встречи ({ props.currentMeetings?.previousMeetings.length })
                </div>
            </div>
            <div className={s.content}>
                <MeetingsContentView
                    authedUser={props.authedUser}
                    handleGoToMeetingRoom={props.handleGoToMeetingRoom}
                    currentMenu={props.currentMenu}
                    currentMeetings={props.currentMeetings}
                />
            </div>
        </div>
    )
}