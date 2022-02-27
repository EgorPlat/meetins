import React from "react";
import { IActiveChat, setActiveChat } from "../../../global/store/chat_model";
import s from "./userChatCard.module.scss";

export default function UserChatCard(props: {user: IActiveChat}): JSX.Element {

    const chooseChat = () => {
        setActiveChat(props.user)
    } 
    return(
        <div className={s.chat} onClick={chooseChat}>
            <div className={s.avatar} style={{backgroundImage: `url('${props.user?.avatar}')`}}>
                {/*<div className={s.round}></div>*/}
            </div>
            <div className={s.info}>
                <div className={s.name}>
                    {props.user?.name}
                </div>
                <div className={s.message}>
                    {props.user?.messages[props.user.messages.length-1]?.text}
                </div>
            </div>
        </div>
    )
}