import { useState } from 'react';
import s from './MyMeetings.module.scss';
import { BsCalendarPlus } from 'react-icons/bs';

export default function MyMeetings() {

    const [isAddModalShown, setIsAddModalShown] = useState<boolean>(false);
    return (
        <div className={s.myMeetings}>
            <div className={s.title}>
                Здесь будут видны встречи, когда-либо запланированные Вами.
                <BsCalendarPlus style={{ cursor: "pointer" }} fontSize={24} />
            </div>
        </div>
    )
}