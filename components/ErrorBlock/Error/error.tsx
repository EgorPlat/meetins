import { useEffect, useState } from 'react';
import { IError } from '../../../global/interfaces/error';
import s from './error.module.scss';

export const Error = (props: { error: IError }) => {
    const error = props.error;
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const visibleTimeout = setTimeout(() => {
            setVisible(false);
        }, error.time);

        return () => {
            clearTimeout(visibleTimeout);
        }
    }, [])

    return (
        visible && 
            <div className={s.eachError} style={{backgroundColor: error.color, color: props.error.textColor}}>
                {error.text}
            </div>
    )
}