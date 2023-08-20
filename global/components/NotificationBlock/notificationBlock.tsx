import Notification from "./Notification/notification";
import s from './notificationBlock.module.scss';

export default function NotificationBlock() {
    return (
        <div className={s.notificationBlock}>
            <Notification />
        </div>
    )
}