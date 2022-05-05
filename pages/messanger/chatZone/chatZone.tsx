import { useStore } from "effector-react";
import React, { useEffect, useRef, useState} from "react";
import Loader from "../../../global/Loader/Loader";
import { activeChat, getDialogMessages, IMyDialog, sendMessageAndUploadActiveChat, setActiveChat } from "../../../global/store/chat_model";
import { $user, baseURL } from "../../../global/store/store";
import ChatMessageForm from "../chatMessageForm/chatMessageForm";
import s from "./chatZone.module.scss";

export default function ChatZone(): JSX.Element {

    const authedUser = useStore($user);
    const messagesEndRef = useRef<HTMLSpanElement>(null);
    const activeChat$ = useStore(activeChat);
 
    const sendForm = (inputValue: string) => {
        if(inputValue.length > 0) {
            sendMessageAndUploadActiveChat(inputValue);
        }
    }

    useEffect(() => {
        getDialogMessages(activeChat$);
        return () => {
            setActiveChat({} as IMyDialog);
        }
    }, [activeChat$.dialogId])
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    })
        return(
            <div className={s.chat}> 
                <div className={s.user}>
                    <div className={s.avatar} style={{
                        backgroundImage: `url('${baseURL + activeChat$.userAvatar}')`}}>
                    </div>
                    <div className={s.name}>
                        {activeChat$.userName}
                    </div>
                    <div className={activeChat$.status ? s.statusOnline : s.status}>
                        {activeChat$.status ? 'В сети' : 'Не в сети'}
                    </div>
                </div>
                <div className={s.messages}>
                    {activeChat$.messages
                        ? activeChat$.messages.map(message =>
                            <div className={message.senderId === authedUser?.userId ? s.myMessage : s.notMyMessage} key={message.content}>
                                {message.content}
                            </div>
                            )
                        : <Loader/>
                    }
                    <span ref={messagesEndRef}></span>
                </div>
                <div className={s.form}>
                    <ChatMessageForm placeholder="Введите сообщение..." onClickForm={(inputValue) => sendForm(inputValue)}/>
                </div>
            </div>
        )
}