import { IMeeting } from '../../../../../global/interfaces/meetings';
import s from './CompletedMeetings.module.scss';

export default function CompletedMeetings(props: {
    data: IMeeting[]
}) {
    return (
        <div className={s.completedMeetings}>
            <div className={s.title}>
                Здесь видна история встреч на которых Вы были
            </div>
        </div>
    )
}