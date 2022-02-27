import { useStore } from "effector-react";
import React from "react";
import { IActiveChat } from "../../../global/store/chat_model";
import { $user } from "../../../global/store/store";
import ChatMessageForm from "../chatMessageForm/chatMessageForm";
import s from "./chatZone.module.scss";

export default function ChatZone(props: {activeChat: IActiveChat | null}): JSX.Element {

    const authedUser = useStore($user);

    const sendForm = (inputValue: string) => {
        console.log(inputValue);
    }
    if(props.activeChat !== null) {
        return( 
            <div className={s.chat}>
                <div className={s.user}>
                    <div className={s.avatar} style={{backgroundImage: `url('${props.activeChat?.avatar}')`}}></div>
                    <div className={s.name}>
                        {props.activeChat?.name}
                    </div>
                    <div className={props.activeChat?.status ? s.statusOnline : s.status}>
                        {props.activeChat?.status ? 'В сети' : 'Не в сети'}
                    </div>
                </div>
                <div className={s.messages}>
                    {props.activeChat?.messages.map(message =>
                    <div className={message.userID === authedUser?.login ? s.myMessage : s.notMyMessage} key={message.text}>
                        {message.text}
                    </div>
                    )}
                </div>
                <div className={s.form}>
                    <ChatMessageForm placeholder="Введите сообщение..." onClickForm={(inputValue) => sendForm(inputValue)}/>
                </div>
            </div>
        )
    } else {
        return(
            <div className={s.noChat}>
                <h3 className={s.alert}>Выберите диалог...</h3>
            </div>
        )
    }
}