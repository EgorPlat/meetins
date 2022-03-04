import React from "react";
import { getDialogMessages, IMyDialog } from "../../../global/store/chat_model";
import { baseURL } from "../../../global/store/store";
import s from "./userChatCard.module.scss";

export default function UserChatCard(props: {user: IMyDialog}): JSX.Element {
    const chooseChat = () => {
        getDialogMessages(props.user);
    } 
    return(
        <div className={s.chat} onClick={chooseChat}>
            <div className={s.avatar} style={{backgroundImage: `url('${baseURL + props.user?.userAvatar}')`}}>
                {/*<div className={s.round}></div>*/}
            </div>
            <div className={s.info}>
                <div className={s.name}>
                    {props.user?.userName}
                </div>
                <div className={s.message}>
                    {props.user?.content}
                </div>
            </div>
        </div>
    )
}