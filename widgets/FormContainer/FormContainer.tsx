import { ReactChild } from "react";

export default function FormContainer(props: {
    children: ReactChild,
}) {
    return (
        <div className="formContainer">
            {props.children}
        </div>
    )
}