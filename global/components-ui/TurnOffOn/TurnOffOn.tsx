import { useState } from 'react';
import s from './TurnOffOn.module.scss';

export default function TurnOffOn (props: {
    inithialStatus: boolean,
    onChange: (status: boolean) => void
}) {
    const [animation, setAnimation] = useState<boolean>(props.inithialStatus);

    const handleChangeStatus = () => {
        props.onChange(!animation);
        setAnimation(!animation);
    };

    return (
        <div className={s.wrapper}>
            <div 
                className={
                    animation ? s.activeBlockOff : s.activeBlockOn
                }
                onClick={handleChangeStatus}
            >

            </div>
        </div>
    )
}