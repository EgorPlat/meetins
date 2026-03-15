import { useEffect, useMemo, useState } from "react";
import { ICreatedNotification, NOTIFICATION_COLOR_TYPES } from "../../../entities/notification";
import s from "./notification.module.scss";

export const Notification = (props: {
    notification: ICreatedNotification,
    handleRemove: (error: ICreatedNotification) => void
}) => {
    const { notification } = props;
    const [visible, setVisible] = useState<boolean>(true);

    const Icon = useMemo(() => {
        return NOTIFICATION_COLOR_TYPES[notification.type].icon;
    }, [notification]);

    useEffect(() => {
        const visibleTimeout = setTimeout(() => {
            setVisible(false);
            setTimeout(() => {
                props.handleRemove(notification);
            }, 1000);
        }, notification.time);
        return () => {
            clearTimeout(visibleTimeout);
        }
    }, []);
    console.log(notification.time / 1000);
    
    return (
        <div
            className={`${visible ? s.errorShowUp : s.errorHide}`}
            style={{ border: `1px solid var(--border-color)`}}
        >
            <Icon color={NOTIFICATION_COLOR_TYPES[notification.type].color} fontSize={24} />
            {notification.text}
            <div 
                className={s.notificationTimer}
                style={{ 
                    animation: `${s.smoothWidthLessen} ${notification.time / 1000}s forwards linear`,
                    backgroundColor: NOTIFICATION_COLOR_TYPES[notification.type].color
                }}
            ></div>
        </div>
    )
}