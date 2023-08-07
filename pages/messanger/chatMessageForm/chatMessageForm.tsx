import React, { ChangeEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { createdSendFileAndUploadActiveChat } from "../../../global/store/chat_model";
import Emoji from "../emoji/emoji";
import s from "./chatMessageForm.module.scss";
import { AiOutlineAudio, AiOutlineFileText, AiOutlineSend } from "react-icons/ai";
import { addNewError } from "../../../global/store/errors_model";

export default function ChatMessageForm(
    props: {
        placeholder: string,
        onClickForm: (inputValue: string) => void,
        isLoaded: boolean,
        isChatExists: boolean
    }
): JSX.Element { 

    const messageRef = useRef<HTMLInputElement>();
    const [isMediaRecorderActive, setIsMediaRecorderActive] = useState<boolean>(false);
    const { t } = useTranslation();

    const sendForm = () => {
        props.onClickForm(messageRef.current.value);
        messageRef.current.value = "";
    };

    const addSmileHandler = (emoji) => {
        messageRef.current.value = messageRef.current.value + emoji;
    };

    const handleMediaRecorder = () => {
        if (!props.isChatExists) {
            addNewError({
                text: "Медиа-файлы можно отправлять только есть в диалоге есть текстовые сообщения",
                color: "black",
                textColor: 'black',
                time: 3000
            });
            return;
        }
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setIsMediaRecorderActive(true);
            let voice = [];
            mediaRecorder.addEventListener("dataavailable", (event) => {
                voice.push(event.data);               
            });
            mediaRecorder.addEventListener("stop", (event) => {
                const voiceBlob = new Blob(voice, {
                    type: 'audio/mp3'
                });
                if (voiceBlob.size > 200000) {
                    addNewError({
                        text: "Слишком длинное голосовое сообщение",
                        color: "black",
                        textColor: 'black',
                        time: 3000
                    });
                    setIsMediaRecorderActive(false);
                    return;
                } else {
                    createdSendFileAndUploadActiveChat(voiceBlob);
                    setIsMediaRecorderActive(false);
                }
            });
            document.getElementById('audioMessageStop').addEventListener('click', () => {
                mediaRecorder.stop();
            });            
        });
    };

    const onSendNewFile = async (event: ChangeEvent<HTMLInputElement>) => {
        if (props.isChatExists) {
            const file = event.target.files[0];
            createdSendFileAndUploadActiveChat(file);
        } else {
            addNewError({
                text: "Медиа-файлы можно отправлять только есть в диалоге есть текстовые сообщения",
                color: "black",
                textColor: 'black',
                time: 3000
            });
        }
    };

    const Loader = () => {
        return (
            <div className={s.loader}></div>
        )
    };

    return(
        <div className={s.form}>
            <div className={s.formInput}>
                <input ref={messageRef} type="text" placeholder={t(props.placeholder)}/>
                <div className={s.fileInput}>
                    <AiOutlineFileText fontSize={30} />
                    <input type="file" onChange={(e) => onSendNewFile(e)}/>
                </div>
                <Emoji addSmileHandler={addSmileHandler} />
                {
                    !isMediaRecorderActive
                    ? 
                    <AiOutlineAudio
                        fontSize={35}  
                        onClick={handleMediaRecorder}
                    />
                    : 
                    <span id="audioMessageStop">Stop</span>
                }
                {
                    props.isLoaded 
                        ? <AiOutlineSend fontSize={35} onClick={sendForm} />
                        : <Loader />
                }
            </div>
        </div>
    )
}