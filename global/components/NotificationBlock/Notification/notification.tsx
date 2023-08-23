import { useEffect, useState } from 'react';
import s from './notification.module.scss';
import { ICreatedNotification } from '../../../interfaces/notification';

export const Notification = (props: { 
    notification: ICreatedNotification, 
    handleRemove: (error: ICreatedNotification) => void 
}) => {
    const { notification } = props;
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const visibleTimeout = setTimeout(() => {
            props.handleRemove(notification);
            setVisible(false);
        }, notification.time);
        return () => {
            clearTimeout(visibleTimeout);
        }
    }, []);

    return (
        <div className={s.eachError} style={{ display: visible ? "block" : "none"}}>
            {notification.text}
        </div>
    )
}