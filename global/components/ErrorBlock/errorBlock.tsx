import { useStore } from 'effector-react';
import { currentErrors, removeError } from '../../store/errors_model';
import { Error } from './Error/error';
import s from './errorBlock.module.scss';
import { ICreatedError } from '../../interfaces/error';

export default function ErrorBlock() {

    const currentErrors$ = useStore(currentErrors);

    const handleRemove = (error: ICreatedError) => {
        removeError(error.id);    
    }
    
    return (
        <div className={s.errorBlock}>
            {
                currentErrors$.map((error, index) => (
                    <Error
                        handleRemove={handleRemove}
                        error={error} 
                        key={error.text}
                    />
                ))
            }
        </div>
    )
}