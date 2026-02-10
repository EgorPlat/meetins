import { ReactElement } from "react";
import s from "./CustomInput.module.scss";

interface ICustomInputProps {
    [key: string]: any,
    postFix?: ReactElement
}

export default function CustomInput({ postFix, ...restProps }: ICustomInputProps) {

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter" && restProps.onClick) {
            restProps.onClick();
        }
    };

    return (
        <div className={s.customInputWrapper}>
            <input placeholder="" {...restProps} onKeyDown={handleKeyDown} />
            <div className={s.postFix}>
                { postFix }
            </div>
        </div>
    )
}