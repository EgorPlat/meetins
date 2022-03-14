import React, { useRef } from "react";
import s from "./chatMessageForm.module.scss";

export default function ChatMessageForm(
    props: {
        placeholder: string,
        onClickForm: (inputValue: string) => void
    }
): JSX.Element { 

    const inputRef = useRef<HTMLInputElement>(null);

    const sendForm = () => {
        inputRef.current?.value !== undefined ? props.onClickForm(inputRef.current?.value) : null;
    }
    return(
        <div className={s.form}>
            <input type="text" placeholder={props.placeholder} ref={inputRef}/>
            <button onClick={sendForm}>Отправить</button>
        </div>
    )
}