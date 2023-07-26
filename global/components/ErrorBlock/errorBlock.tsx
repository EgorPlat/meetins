import { useStore } from 'effector-react';
import { currentErrors } from '../../store/errors_model';
import { Error } from './Error/error';
import s from './errorBlock.module.scss';

export default function ErrorBlock() {

    const currentErrors$ = useStore(currentErrors);

    return (
        <div className={s.errorBlock}>
            {
                currentErrors$.map((error, index) => <Error error={error} key={error.text + `${index}`} />)
            }
        </div>
    )
}