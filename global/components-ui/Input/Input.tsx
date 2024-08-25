import Image from "next/image"
import React, { ReactElement } from "react"
import { UseFormRegisterReturn } from "react-hook-form"
import s from "./input.module.scss"

export default function Input({
    icon,
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
	icon: any
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
	
    return (
        <label
            style={style}
            className={`${s.customInput} ${className ? className : ""}`}
            htmlFor={id}>
            {icon && (
                <Image src={icon} width='21' height='25' alt='login icon' />
            )}

            <input
                placeholder={placeholder}
                type={type}
                id={id}
                autoComplete={autocomplete}
                pattern={pattern}
                {...register}
                onKeyDown={handleKeyDown}
            />

            <div className={s.secondIcon}>{children}</div>
        </label>
    )
}
