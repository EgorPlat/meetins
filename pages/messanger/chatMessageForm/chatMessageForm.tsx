import React, { ChangeEvent, useRef } from "react";
import { useTranslation } from "react-i18next";
import { createdSendFileAndUploadActiveChat } from "../../../global/store/chat_model";
import Emoji from "../emoji/emoji";
import s from "./chatMessageForm.module.scss";

export default function ChatMessageForm(
    props: {
        placeholder: string,
        onClickForm: (inputValue: string) => void,
        isLoaded: boolean,
        isChatExists: boolean
    }
): JSX.Element { 

    const messageRef = useRef<HTMLInputElement>();
    const { t } = useTranslation();

    const sendForm = () => {
        props.onClickForm(messageRef.current.value);
    }
    const addSmileHandler = (emoji) => {
        messageRef.current.value = messageRef.current.value + emoji;
    }
    const onSendNewFile = async (event: ChangeEvent<HTMLInputElement>) => {
        if (props.isChatExists) {
            const file = event.target.files[0];
            createdSendFileAndUploadActiveChat(file);
        }
    }
    const Loader = () => {
        return (
            <div className={s.loader}></div>
        )
    }
    return(
        <div className={s.form}>
            <input ref={messageRef} type="text" placeholder={t(props.placeholder)}/>
            <Emoji addSmileHandler={addSmileHandler} />
            <div className={props.isChatExists ? s.fileInputBlocked : s.fileInput}>
                <input type="file" onChange={(e) => onSendNewFile(e)}/>
            </div>
            <button onClick={sendForm} disabled={!props.isLoaded}>{props.isLoaded ? t('Отправить') : Loader()}</button>
        </div>
    )
}