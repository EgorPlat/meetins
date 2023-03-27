import { useState } from 'react';
import s from './buttonWithHint.module.scss';

interface IHintProps {
    title: string,
    hintTitle: string
}

export default function ButtonWithHint({ title, hintTitle }: IHintProps) {

    const [isHint, setIsHint] = useState<boolean>(false);

    return (
        <div className={s.hintWrapper}>
            <button onClick={() => setIsHint(prev => !prev)}>
                {title}
            </button>
            {
                    isHint &&
                    <div className={s.hint}>
                        {hintTitle}
                    </div>
                }
        </div>
    )
}