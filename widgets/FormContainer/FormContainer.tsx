import { ReactChild } from "react";
import s from "./FormContainer.module.scss";

export default function FormContainer(props: {
    children: ReactChild,
}) {
    return (
        <div className={s.formContainer}>
            {props.children}
        </div>
    )
}