import { ReactElement } from "react";
import s from "./CustomInput.module.scss";

interface ICustomInputProps {
    [key: string]: any,
    postFix?: ReactElement,
    bordered?: boolean
}

export default function CustomInput({ 
    postFix, 
    bordered = true, 
    ...restProps
}: ICustomInputProps) {

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter" && restProps.onClick) {
            restProps.onClick();
        }
    };

    return (
        <div className={s.customInputWrapper} style={{ border: bordered ? "1px solid var(--border-color)" : "1px solid transparent" }}>
            <input style={{ border: "none" }} {...restProps} onKeyDown={handleKeyDown} />
            <div className={s.postFix}>
                { postFix }
            </div>
        </div>
    )
}