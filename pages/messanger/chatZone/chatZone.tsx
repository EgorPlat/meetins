import { useStore } from "effector-react";
import React, { useEffect, useRef} from "react";
import { activeChat, sendMessageInDialog, setActiveChat } from "../../../global/store/chat_model";
import { $user, baseURL } from "../../../global/store/store";
import ChatMessageForm from "../chatMessageForm/chatMessageForm";
import s from "./chatZone.module.scss";

export default function ChatZone(): JSX.Element {

    const authedUser = useStore($user);
    const messagesEndRef = useRef<HTMLSpanElement>(null);
    const activeChat$ = useStore(activeChat);

    const sendForm = (inputValue: string) => {
        if(activeChat$ !== null) {
            sendMessageInDialog(
                {dialogId: activeChat$.dialogId, content: inputValue}
            ).then((response) => {
                setActiveChat({...activeChat$, messages: [...response?.data]})
            })
        }
    }
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
        console.log('is rerender');
    })
    useEffect(() => {
        return () => {
            setActiveChat(null);
        }
    }, [])
        return(
            <div className={s.chat}> 
                <div className={s.user}>
                    <div className={s.avatar} style={{
                        backgroundImage: `url('${ activeChat$?.messages !== undefined ? baseURL + activeChat$?.messages[0].avatar : null}')`}}>
                    </div>
                    <div className={s.name}>
                        {activeChat$?.userName}
                    </div>
                    <div className={activeChat$?.status ? s.statusOnline : s.status}>
                        {activeChat$?.status ? 'В сети' : 'Не в сети'}
                    </div>
                </div>
                <div className={s.messages}>
                    {activeChat$?.messages?.map(message =>
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