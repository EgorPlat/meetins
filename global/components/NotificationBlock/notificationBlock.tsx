import { useStore } from 'effector-react';
import { Notification } from './Notification/notification';
import s from './notificationBlock.module.scss';
import { ICreatedNotification } from '../../interfaces/notification';
import { currentNotifications, removeNotification } from '../../store/notifications_model';

export default function NotificationBlock() {

    const currentNotifications$ = useStore(currentNotifications);

    const handleRemove = (error: ICreatedNotification) => {
        removeNotification(error.id);    
    }
    
    return (
        <div className={s.errorBlock}>
            {
                currentNotifications$.map((notification, index) => (
                    <Notification
                        handleRemove={handleRemove}
                        notification={notification} 
                        key={notification.text}
                    />
                ))
            }
        </div>
    )
}