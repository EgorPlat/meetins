import { useUnit } from "effector-react";
import { Notification } from "./Notification/notification";
import s from "./notificationBlock.module.scss";
import { ICreatedNotification } from "../../entities/notification";
import { currentNotifications, removeNotification } from "../../global/store/notifications_model";

export default function NotificationBlock() {

    const currentNotifications$ = useUnit(currentNotifications);

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
                        key={notification.id}
                    />
                ))
            }
        </div>
    )
}