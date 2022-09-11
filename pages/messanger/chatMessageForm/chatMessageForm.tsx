import React, { useRef } from "react";
import Emoji from "../emoji/emoji";
import s from "./chatMessageForm.module.scss";

export default function ChatMessageForm(
    props: {
        placeholder: string,
        onClickForm: (inputValue: string) => void
    }
): JSX.Element { 

    const messageRef = useRef<HTMLInputElement>();

    const sendForm = () => {
        props.onClickForm(messageRef.current.value);
    }
    const addSmileHandler = (emoji) => {
        messageRef.current.value = messageRef.current.value + emoji;
    }
    return(
        <div className={s.form}>
            <input ref={messageRef} type="text" placeholder={props.placeholder}/>
            <Emoji addSmileHandler={addSmileHandler} />
            <button onClick={sendForm}>Отправить</button>
        </div>
    )
}