import React, { ReactElement } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import s from "./input.module.scss"
import { IconType } from "react-icons"

export default function Input({
    Icon,
    className,
    id,
    placeholder,
    type,
    pattern,
    style,
    register,
    children,
    autocomplete,
}: {
	Icon: IconType
	className?: string
	id: string
	placeholder: string
	type: string
	pattern?: string
	style?: { marginTop: string }
	register: UseFormRegisterReturn
	children?: ReactElement<any, any>
	autocomplete?: "off" | "on"
}): JSX.Element {

    const handleKeyDown = (e) => {
        if (e.code === "Space") e.preventDefault();
    };

    const handleClickSecondIcon = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <label
            style={style}
            className={`${s.customInput} ${className ? className : ""}`}
            htmlFor={id}
        >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Icon fontSize={20} color="black" />
            </div>
            <input
                placeholder={placeholder}
                type={type}
                id={id}
                autoComplete={autocomplete}
                pattern={pattern}
                {...register}
                onKeyDown={handleKeyDown}
            />

            <div className={s.secondIcon} onClick={handleClickSecondIcon}>{children}</div>
        </label>
    )
}
