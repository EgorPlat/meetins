import { ReactNode } from "react";
import s from "./FormContainer.module.scss";

export default function FormContainer(props: {
    children: ReactNode,
}) {
    return (
        <div className={s.formContainer}>
            {props.children}
        </div>
    )
}