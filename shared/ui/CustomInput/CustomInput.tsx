import { ReactElement } from "react";
import s from "./CustomInput.module.scss";

interface ICustomInputProps {
    [key: string]: any,
    postFix?: ReactElement,
    bordered: boolean
}

export default function CustomInput({ postFix, bordered, ...restProps }: ICustomInputProps) {

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter" && restProps.onClick) {
            restProps.onClick();
        }
    };

    return (
        <div className={s.customInputWrapper} style={{ border: bordered ? "1px solid var(--border-color)" : "none" }}>
            <input placeholder="" {...restProps} onKeyDown={handleKeyDown} />
            <div className={s.postFix}>
                { postFix }
            </div>
        </div>
    )
}