import { useEffect, useState } from 'react';
import s from './buttonWithHint.module.scss';
import { setIsScrollPageBlocked } from '../../global/store/store';

interface IHintProps {
    title: string,
    hintTitle: string,
    fontSize: number
}

export default function ButtonWithHint({ title, hintTitle, fontSize }: IHintProps) {

    const [isHint, setIsHint] = useState<boolean>(false);

    useEffect(() => {
        if (isHint) {
            setIsScrollPageBlocked(true);
        } else {
            setIsScrollPageBlocked(false);
        }
    }, [isHint]);

    return (
        <div className={s.hintBackground}>
            <div className={s.hintWrapper} style={{ fontSize: fontSize }}>
                <button onClick={() => setIsHint(prev => !prev)}>
                    {title}
                </button>
                {
                    isHint &&
                    <>
                        <div 
                            className={s.bluredBlock}
                            style={{ height: document.getElementsByTagName('body')[0].clientHeight }}
                            onClick={() => setIsHint(prev => !prev)}
                        ></div>
                        <div className={s.hint}>
                            {hintTitle}
                        </div>
                    </>
                    
                }
            </div>
        </div>
    )
}