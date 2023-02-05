import { useStore } from 'effector-react';
import { currentErrors } from '../../global/store/errors_model';
import { Error } from './Error/error';
import s from './errorBlock.module.scss';

export default function ErrorBlock() {

    const currentErrors$ = useStore(currentErrors);

    return (
        <div className={s.errorBlock}>
            {
                currentErrors$.map((error) => <Error error={error} />)
            }
        </div>
    )
}