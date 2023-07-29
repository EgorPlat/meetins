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
        }, error.time);
        console.log(visibleTimeout)
        return () => {
            clearTimeout(visibleTimeout);
        }
    }, []);

    return (
        <div className={s.eachError}>
            {error.text}
        </div>
    )
}