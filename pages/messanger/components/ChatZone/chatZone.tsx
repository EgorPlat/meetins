import { useUnit } from "effector-react";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getDateInDMFormat } from "../../../../shared/functions/getDateInDMFormat";
import { getMinutesAndHoursFromString } from "../../../../shared/functions/getMinutesAndHoursFromString";
import { isTypeOfFileAreImage, isTypeOfFileAreVideo } from "../../../../shared/helpers/validate";
import { IMyDialog } from "../../../../entities";
import {
    createdSendFileAndUploadActiveChat,
    createdSendMessageAndUploadActiveChat,
    isMessageWithFileLoaded,
    setActiveChat
} from "../../../../global/store/chat_model";
import { $onlineUsers, $user, baseURL, setIsVideoCallOpened, setPeerIDForCall } from "../../../../global/store/store";
import { defaultDialog } from "../../../../global/mock/defaultDialog";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useUserMediaTracks } from "../../../../shared/hooks/useUserMediaTracks";
import { useRouter } from "next/router";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import CustomEditMenu from "../../../../shared/ui/CustomEditMenu/CustomEditMenu";
import CustomModal from "../../../../shared/ui/CustomModal/CustomModal";
import ChatMessageForm from "../ChatMessageForm/chatMessageForm";
import s from "./chatZone.module.scss";
import { connection } from "../../../../global/store/connection_model";
import { addNotification } from "../../../../global/store/notifications_model";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";

interface IChatZoneProps {
    activeChat$: IMyDialog
}
export default function ChatZone({ activeChat$ }: IChatZoneProps): JSX.Element {

    const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
    const [videoMessageActive, setVideoMessageActive] = useState<boolean>();

    const authedUser = useUnit($user);
    const isMessageWithFileLoaded$ = useUnit(isMessageWithFileLoaded);
    const onlineUsers = useUnit($onlineUsers);
    const connection$ = useUnit(connection);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const videoMessageStreamRef = useRef<HTMLVideoElement>(null);

    const router = useRouter();
    const isUserOnline = onlineUsers.filter(el => el.userId === activeChat$.userId).length !== 0;
    const { t } = useTranslation();

    const { handleActivateMedia, mediaChunks } = useUserMediaTracks({
        video: { width: 200, height: 200 },
        audio: true,
        htmlElementIdForStopMedia: "videoMessageStop"
    });


    const handleBack = () => {
        setActiveChat(defaultDialog);
    };

    const handleGoToProfile = (login: number) => {
        if (login) router.push(`/profile/${login}`);
    };

    const sendForm = (inputValue: string) => {
        if (inputValue.length > 0) {
            createdSendMessageAndUploadActiveChat(inputValue);
        };
    };

    const handleOpenVideoCall = () => {
        if (connection$) {
            connection$.emit("get-peerID-for-call", { userId: activeChat$.userId }, (res: string) => {
                setPeerIDForCall(res);
                setIsVideoCallOpened(true);
                if (res.length !== 0) {
                    setPeerIDForCall(res);
                    setIsVideoCallOpened(true);
                } else {
                    addNotification({
                        time: 3000,
                        textColor: "white",
                        type: "warning",
                        text: "Пользователь не в сети."
                    })
                }
            });
        }
    };

    const handleVideoMessageConfirmed = () => {
        setShowVideoModal(false);
        if (activeChat$.dialogId !== "none") {
            setVideoMessageActive(true);
            handleActivateMedia((stream: MediaStream) => {
                if (videoMessageStreamRef.current) {
                    videoMessageStreamRef.current.srcObject = stream;
                    videoMessageStreamRef.current.play();
                }
            })
        } else {
            addNotification({
                time: 3000,
                type: "warning",
                text: "Записывать видеосообщения можно только если чат уже начат",
                textColor: "black"
            });
        }
    };

    useEffect(() => {
        if (mediaChunks) {
            setVideoMessageActive(false);
            const blob = new Blob(mediaChunks, {
                type: "video/mp4",
            });
            createdSendFileAndUploadActiveChat(blob);
        }
    }, [mediaChunks]);
    
    if (activeChat$) {
        return (
            <div className={s.chat}>
                <div className={`${s.user} ${s.block}`}>
                    <div className={s.avatar} style={{
                        backgroundImage: `url('${baseURL + activeChat$.userAvatar}')`
                    }}>
                    </div>
                    <div className={s.userTextInfo}>
                        <div className={s.name}>
                            {activeChat$.userName}
                            <MdOutlineOndemandVideo
                                cursor="pointer"
                                fontSize={26}
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowVideoModal(true)}
                            />
                        </div>
                        <div className={isUserOnline ? s.statusOnline : s.status}>
                            {isUserOnline ? t("В сети") : t("Не в сети")}
                        </div>
                    </div>
                    <div className={s.moreActions}>
                        <CustomEditMenu
                            data={[
                                { menuTitle: "Профиль", menuFunction: () => handleGoToProfile(activeChat$.userLogin) },
                                { menuTitle: "Назад", menuFunction: handleBack },
                                { menuTitle: "Позвонить", menuFunction: handleOpenVideoCall }
                            ]}
                        />
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
                                        {isDateAlreadyExist &&
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
                                                    <a href={baseURL + message.content} target="_blank">{t("Открыть полностью")}</a>
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
                                                message.type.includes("application") &&
                                                <a href={`${baseURL + message.content}`}>{message.content}</a>
                                            }
                                            {
                                                message.type.includes("audio") &&
                                                <audio controls src={baseURL + message.content}></audio>
                                            }
                                            {
                                                message.type === "text" &&
                                                <pre className={s.textMessage}>
                                                    {message.content}
                                                </pre>
                                            }
                                            <div className={s.messageInfo}>
                                                <div className={s.messageTime}>
                                                    {getMinutesAndHoursFromString(message.sendAt)}
                                                </div>
                                                <div className={s.messageReadStatus}>
                                                    {
                                                        isMyMessage
                                                            ? message.isRead
                                                                ? <IoCheckmarkDoneOutline color="blue" fontSize={18} />
                                                                : <IoCheckmarkDoneOutline color="black" fontSize={18} />
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : <CustomLoader />
                    }
                    <div ref={messagesEndRef}></div>
                </div>
                <div className={`${s.form} ${s.block}`}>
                    <ChatMessageForm
                        isLoaded={isMessageWithFileLoaded$}
                        placeholder="Введите сообщение"
                        onClickForm={(inputValue) => sendForm(inputValue)}
                        isChatExists={activeChat$.dialogId !== "none"}
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