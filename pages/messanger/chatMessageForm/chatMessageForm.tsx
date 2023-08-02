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
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
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
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            setIsMediaRecorderActive(true);
            setMediaRecorder(mediaRecorder);
            let voice = [];
            mediaRecorder.addEventListener("dataavailable", (event) => {
                voice.push(event.data);               
            });
            mediaRecorder.addEventListener("stop", () => {
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
        });
    };

    const onSendNewFile = async (event: ChangeEvent<HTMLInputElement>) => {
        if (props.isChatExists) {
            const file = event.target.files[0];
            createdSendFileAndUploadActiveChat(file);
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
                <div className={props.isChatExists ? s.fileInput : s.fileInputBlocked}>
                    <AiOutlineFileText fontSize={30} color="#3DB2FF" />
                    <input type="file" onChange={(e) => onSendNewFile(e)}/>
                </div>
                <Emoji addSmileHandler={addSmileHandler} />
                {
                    !isMediaRecorderActive
                    ? 
                    <AiOutlineAudio
                        color="#3DB2FF" 
                        fontSize={35}  
                        style={{cursor: "pointer"}}
                        onClick={handleMediaRecorder}
                    />
                    : 
                    <span onClick={() => mediaRecorder.stop()}>Stop</span>
                }
                {
                    props.isLoaded 
                        ? <AiOutlineSend style={{cursor: "pointer"}} color="#3DB2FF" fontSize={35} onClick={sendForm} />
                        : <Loader />
                }
            </div>
        </div>
    )
}