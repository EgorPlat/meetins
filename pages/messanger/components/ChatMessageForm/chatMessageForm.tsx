import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { createdSendFileAndUploadActiveChat } from "../../../../global/store/chat_model";
import Emoji from "../Emoji/emoji";
import s from "./chatMessageForm.module.scss";
import { addNotification } from "../../../../global/store/notifications_model";
import { useUserMediaTracks } from "../../../../shared/hooks/useUserMediaTracks";
import { CiFileOn, CiMicrophoneOn } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";
import { type } from "os";
import { blob } from "stream/consumers";

export default function ChatMessageForm(
    props: {
        placeholder: string,
        onClickForm: (inputValue: string) => void,
        isLoaded: boolean,
        isChatExists: boolean
    }
): JSX.Element {

    const messageRef = useRef<HTMLTextAreaElement>();
    const [isMediaRecorderActive, setIsMediaRecorderActive] = useState<boolean>(false);
    const { t } = useTranslation();
    const { handleActivateMedia, mediaChunks } = useUserMediaTracks({
        video: false,
        audio: true,
        htmlElementIdForStopMedia: "audioMessageStop"
    });

    const sendForm = () => {
        props.onClickForm(messageRef.current.value);
        messageRef.current.value = "";
    };

    const addSmileHandler = (emoji) => {
        messageRef.current.value = messageRef.current.value + emoji;
    };

    const handleMediaRecorder = () => {
        if (!props.isChatExists) {
            addNotification({
                text: "Медиа-файлы можно отправлять только если в диалоге есть текстовые сообщения",
                type: "info",
                textColor: "black",
                time: 3000
            });
            return;
        }
        setIsMediaRecorderActive(true);
        handleActivateMedia(() => {});
    };

    const onSendNewFile = async (event: ChangeEvent<HTMLInputElement>) => {
        if (props.isChatExists) {
            const file = event.target.files[0];
            createdSendFileAndUploadActiveChat(file);
        } else {
            addNotification({
                text: "Медиа-файлы можно отправлять только есть в диалоге есть текстовые сообщения",
                type: "info",
                textColor: "black",
                time: 3000
            });
        }
    };

    function blobToBase64(blob) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    };

    useEffect(() => {
        if (mediaChunks) {
            const voiceBlob = new Blob(mediaChunks, {
                type: "audio/mp3"
            });
        
            const voiceFile = new File([voiceBlob], "voice.mp3", {
                type: "audio/mp3"
            });
            setIsMediaRecorderActive(false);
            createdSendFileAndUploadActiveChat(voiceFile);
        }
    }, [mediaChunks]);

    const Loader = () => {
        return (
            <div className={s.loader}></div>
        )
    };

    return (
        <div className={s.form}>
            <div className={s.formInput}>
                <textarea ref={messageRef} placeholder={t(props.placeholder)} />
                <div className={s.fileInput}>
                    <CiFileOn fontSize={30} color="gray" />
                    <input type="file" onChange={(e) => onSendNewFile(e)} />
                </div>
                <Emoji addSmileHandler={addSmileHandler} />
                {
                    !isMediaRecorderActive
                        ?
                        <CiMicrophoneOn
                            color="gray"
                            fontSize={32}
                            onClick={handleMediaRecorder}
                        />
                        :
                        <span id="audioMessageStop">Stop</span>
                }
                {
                    props.isLoaded
                        ? <VscSend fontSize={30} onClick={sendForm} color="gray" />
                        : <Loader />
                }
            </div>
        </div>
    )
}