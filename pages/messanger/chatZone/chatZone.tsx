import { useStore } from "effector-react";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useLayoutEffect } from "react";
import { getDialogMessages, IMyDialog, sendMessageInDialog, setActiveChat } from "../../../global/store/chat_model";
import { $user, baseURL } from "../../../global/store/store";
import ChatMessageForm from "../chatMessageForm/chatMessageForm";
import s from "./chatZone.module.scss";

export default function ChatZone(props: {activeChat: IMyDialog}): JSX.Element {

    const authedUser = useStore($user);
    const messagesEndRef = useRef<any>(null);
    
    const sendForm = (inputValue: string) => {
        sendMessageInDialog(
            {dialogId: props.activeChat?.dialogId, content: inputValue}
        ).then((response) => {
            setActiveChat({...props.activeChat, messages: [...response?.data]})
        })
    }
    useLayoutEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        console.log('rerender chat zone');
    })
    useEffect(() => {
        getDialogMessages(props.activeChat);
        return () => {
            setActiveChat(null);
        }
    }, [])
        return(
            <div className={s.chat}> 
                <div className={s.user}>
                    <div className={s.avatar} style={{
                        backgroundImage: `url('${ props.activeChat?.messages !== undefined ? baseURL + props.activeChat?.messages[0].avatar : null}')`}}>
                    </div>
                    <div className={s.name}>
                        {props.activeChat?.userName}
                    </div>
                    <div className={props.activeChat?.status ? s.statusOnline : s.status}>
                        {props.activeChat?.status ? 'В сети' : 'Не в сети'}
                    </div>
                </div>
                <div className={s.messages}>
                    {props.activeChat?.messages?.map(message =>
                    <div className={message.isMine ? s.myMessage : s.notMyMessage} key={message.content}>
                        {message.content}
                    </div>
                    )}
                    <span ref={messagesEndRef}></span>
                </div>
                <div className={s.form}>
                    <ChatMessageForm placeholder="Введите сообщение..." onClickForm={(inputValue) => sendForm(inputValue)}/>
                </div>
            </div>
        )
}