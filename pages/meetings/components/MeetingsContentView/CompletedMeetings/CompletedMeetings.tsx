import s from './CompletedMeetings.module.scss';

export default function CompletedMeetings() {
    return (
        <div className={s.completedMeetings}>
            <div className={s.title}>
                Здесь видна история встреч на которых Вы были
            </div>
        </div>
    )
}