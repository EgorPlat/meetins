import { useState } from "react";
import s from "./TurnOffOn.module.scss";

interface IFullProps {
    inithialStatus: boolean,
    onChange: (status: boolean) => void
    readOnly: boolean
}
interface IReadOnlyProps {
    inithialStatus: boolean,
    readOnly: boolean
}
export default function TurnOffOn (props: IFullProps | IReadOnlyProps) {
    const [animation, setAnimation] = useState<boolean>(props.inithialStatus);

    const handleChangeStatus = () => {
        if (props.readOnly) return;
        if ("onChange" in props) {
            props?.onChange(!animation);
        }
        setAnimation((prev) => !prev);
    };

    return (
        <div className={s.wrapper}>
            <div className={ animation ? s.activeBlockOff : s.activeBlockOn } onClick={handleChangeStatus} ></div>
        </div>
    )
}