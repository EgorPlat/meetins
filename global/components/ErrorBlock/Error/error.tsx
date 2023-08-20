import { useEffect, useState } from 'react';
import { ICreatedError, IError } from '../../../interfaces/error';
import s from './error.module.scss';

export const Error = (props: { 
    error: ICreatedError, 
    handleRemove: (error: ICreatedError) => void 
}) => {
    const { error } = props;
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const visibleTimeout = setTimeout(() => {
            props.handleRemove(error);
            setVisible(false);
        }, error.time);
        return () => {
            clearTimeout(visibleTimeout);
        }
    }, []);

    return (
        <div className={s.eachError} style={{ display: visible ? "block" : "none"}}>
            {error.text}
        </div>
    )
}