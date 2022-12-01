import React, { ChangeEvent, useRef } from "react";
import { createdSendFileAndUploadActiveChat } from "../../../global/store/chat_model";
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
    const onSendNewFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        createdSendFileAndUploadActiveChat(file);
    }
    return(
        <div className={s.form}>
            <input ref={messageRef} type="text" placeholder={props.placeholder}/>
            <Emoji addSmileHandler={addSmileHandler} />
            <div className={s.fileInput}>
                <input type="file" onChange={(e) => onSendNewFile(e)}/>
            </div>
            <button onClick={sendForm}>Отправить</button>
        </div>
    )
}