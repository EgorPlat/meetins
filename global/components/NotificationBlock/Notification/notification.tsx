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
            setVisible(false);
            setTimeout(() => {
                props.handleRemove(notification);
            }, 1000);
        }, notification.time);
        return () => {
            clearTimeout(visibleTimeout);
        }
    }, []);
    return (
        <div
            className={`${ visible ? s.errorShowUp : s.errorHide}`} 
            style={{ border: `2.5px solid ${notification.color}`}}
        >
            {notification.text}
        </div>
    )
}