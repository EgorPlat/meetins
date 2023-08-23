import { useStore } from "effector-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDateInDMFormat } from "../../../global/functions/getDateInDMFormat";
import { getMinutesAndHoursFromString } from "../../../global/functions/getMinutesAndHoursFromString";
import { isTypeOfFileAreImage, isTypeOfFileAreVideo } from "../../../global/helpers/validate";
import { IMyDialog } from "../../../global/interfaces";
import {
    createdSendFileAndUploadActiveChat,
    createdSendMessageAndUploadActiveChat,
    isMessageWithFileLoaded,
    sendFileAndUploadActiveChat,
    setActiveChat
} from "../../../global/store/chat_model";
import { $onlineUsers, $user, baseURL } from "../../../global/store/store";
import ChatMessageForm from "../chatMessageForm/chatMessageForm";
import s from "./chatZone.module.scss";
import Loader from "../../../components-ui/Loader/Loader";
import { defaultDialog } from "../../../global/mock/defaultDialog";
import { MdOutlineOndemandVideo } from "react-icons/md";
import CustomModal from "../../../components-ui/CustomModal/CustomModal";
import { addNewError } from "../../../global/store/errors_model";
import { useUserMediaTracks } from "../../../global/hooks/useUserMediaTracks";

interface IChatZoneProps {
    activeChat$: IMyDialog
}
export default function ChatZone({ activeChat$ }: IChatZoneProps): JSX.Element {
    
    const authedUser = useStore($user);
    const isMessageWithFileLoaded$ = useStore(isMessageWithFileLoaded);
    const onlineUsers = useStore($onlineUsers);
    const isUserOnline = onlineUsers.filter(el => el.userId !== activeChat$.userId).length > 0;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [moreActionForUserModal, setMoreActionUserForModal] = useState<boolean>(false);
    const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
    const [videoMessageActive, setVideoMessageActive] = useState<boolean>();
    const videoMessageStreamRef = useRef<HTMLVideoElement>(null);
    const { t } = useTranslation();

    const { handleActivateMedia, mediaChunks } = useUserMediaTracks({ 
        video: { width: 200, height: 200 }, 
        audio: true, 
        htmlElementIdForStopMedia: 'videoMessageStop' 
    });

    const handleBack = () => {
        setActiveChat(defaultDialog);
    }

    const sendForm = (inputValue: string) => {
        if(inputValue.length > 0) {
            createdSendMessageAndUploadActiveChat(inputValue);
        }
    };

    const handleVideoMessageConfirmed = () => {
        setShowVideoModal(false);
        handleActivateMedia((stream: MediaStream) => {
            setVideoMessageActive(true);
            if (videoMessageStreamRef.current) {
                videoMessageStreamRef.current.srcObject = stream;
                videoMessageStreamRef.current.play();
            }
        })
    }
    
    useEffect(() => {
        if (mediaChunks) {
            setVideoMessageActive(false);
            const blob = new Blob(mediaChunks, {
                type: 'video/mp4',
            });
            createdSendFileAndUploadActiveChat(blob);
        }
    }, [mediaChunks]);
    
    useEffect(() => {
        return () => { 
            setActiveChat(defaultDialog);
        }
    }, []);

    if (activeChat$) {
        return(
            <div className={s.chat}>  
                <div className={`${s.user} ${s.block}`}>
                    <div className={s.avatar} style={{
                        backgroundImage: `url('${baseURL + activeChat$.userAvatar}')`}}>
                    </div>
                    <div className={s.userTextInfo}>
                        <div className={s.name}>
                            {activeChat$.userName}
                            <MdOutlineOndemandVideo
                                cursor="pointer"
                                fontSize={26}
                                style={{cursor: "pointer"}}
                                onClick={() => setShowVideoModal(true)}
                            />
                        </div>
                        <div className={!isUserOnline ? s.statusOnline : s.status}>
                            {!isUserOnline ? t('В сети') : t('Не в сети')}
                        </div>
                        <div className={s.userMoreActions} onClick={() => setMoreActionUserForModal(!moreActionForUserModal)}>
                            <div className={s.userMoreActionsLine}></div>
                            <div className={s.userMoreActionsLine}></div>
                            <div className={s.userMoreActionsLine}></div>
                            {
                                moreActionForUserModal && 
                                <div className={s.userActionsList}>
                                    <div className={s.userActionsListElement}>Профиль</div>
                                    <div className={s.userActionsListElement}>Очистить чат</div>
                                    <div className={s.userActionsListElement} onClick={handleBack}>Назад </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={`${s.messages} ${s.block}`}>
                    {
                        activeChat$.messages.length === 0 && 
                        <div className={s.notificationMessage}>Чтобы начать диалог напишите какое-то сообщение.</div>
                    }
                    {activeChat$.messages
                        ? activeChat$.messages.map((message, index) => {
                            const isMyMessage = message.senderId === authedUser?.userId;
                            const isDateAlreadyExist = 
                                getDateInDMFormat(message.sendAt) !== getDateInDMFormat(activeChat$.messages[index - 1]?.sendAt);
                            return (
                                <div className={s.messageWrapper} key={message.messageId}>
                                    <div className={s.messageDateWrapper}>
                                        { isDateAlreadyExist && 
                                            <div className={s.messageDate}>{getDateInDMFormat(message.sendAt)}</div> 
                                        }
                                    </div>
                                    <div className={isMyMessage ? s.myMessageBlock : s.notMyMessageBlock}>
                                            <div 
                                                className={isMyMessage ? s.myMessage : s.notMyMessage}
                                            >
                                            {
                                                isTypeOfFileAreImage(message.type) 
                                                && 
                                                <div className={s.messageWithFile}>
                                                    <img 
                                                        src={baseURL + message.content} 
                                                        width="100px" 
                                                        height="100px"
                                                    />
                                                    <a href={baseURL + message.content} target="_blank">{t('Открыть полностью')}</a>
                                                </div>
                                            }
                                            {
                                                isTypeOfFileAreVideo(message.type)
                                                && 
                                                <div className={s.messageWithVideo}>
                                                    <video 
                                                        controls
                                                        src={baseURL + message.content}
                                                        width="200px"
                                                    ></video>
                                                </div>
                                            }
                                            {
                                                message.type.includes('document') &&
                                                <a href={`${baseURL + message.content}`}>{message.content}</a>
                                            }
                                            {
                                                message.type.includes('audio') &&
                                                <audio controls src={baseURL + message.content}></audio>
                                            }
                                            {
                                                message.type === 'text' && message.content
                                            }
                                            <div className={s.messageTime}>
                                                { getMinutesAndHoursFromString(message.sendAt) }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : <Loader/>
                    }
                    <div ref={messagesEndRef}></div>
                </div>
                <div className={`${s.form} ${s.block}`}>
                    <ChatMessageForm 
                        isLoaded={isMessageWithFileLoaded$} 
                        placeholder="Введите сообщение" 
                        onClickForm={(inputValue) => sendForm(inputValue)}
                        isChatExists={!activeChat$.userId}
                    />
                </div>
                {
                    showVideoModal &&
                    <CustomModal 
                        isDisplay={showVideoModal}
                        title="Подтвердите действие"
                        typeOfActions="default"
                        changeModal={setShowVideoModal}
                        actionConfirmed={handleVideoMessageConfirmed}
                    >
                        Хотите записать видео-сообщение?
                    </CustomModal>
                }
                {
                    videoMessageActive &&
                    <CustomModal 
                        isDisplay={videoMessageActive}
                        title="Видео-сообщение"
                        typeOfActions="none"
                        changeModal={() => null}
                        actionConfirmed={setVideoMessageActive}
                    >
                        <div className={s.videoMessageWrapper}>
                            <video
                                className="video" 
                                width="200px" 
                                height="200px" 
                                ref={videoMessageStreamRef} 
                                autoPlay
                                muted
                            ></video>
                            <button id="videoMessageStop">Остановить</button>
                        </div>
                    </CustomModal>
                }
            </div>
        )
    } else {
        return null;
    }
}