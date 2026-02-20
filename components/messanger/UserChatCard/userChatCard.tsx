import React, { JSX } from "react";
import { IMyDialog, User } from "@/entities";
import { getDialogMessages } from "@/global/store/chat_model";
import { baseURL } from "@/global/store/store";
import calculateCountOfUnredMessageInDialog from "@/shared/helpers/helper";
import s from "./userChatCard.module.scss";

export default function UserChatCard(props: { dialog: IMyDialog, authedUser: User }): JSX.Element {

    const countUnrededMessageInDialog = calculateCountOfUnredMessageInDialog(props.dialog?.messages, props.authedUser);

    const chooseChat = () => {
        getDialogMessages(props.dialog);
    };
    
    return(
        <div className={s.chat} onClick={chooseChat}>
            <div className={s.avatar} style={{ backgroundImage: `url('${baseURL + props.dialog?.userAvatar}')` }}></div>
            <div className={s.info}>
                {props.dialog?.userName}
                <div className={s.lastMessage}>
                    {
                        countUnrededMessageInDialog !== 0 
                            ? <div className={s.unreadMessagesCounter}>{countUnrededMessageInDialog}</div>
                            : <div className={s.readMessage}></div>
                    }    
                    <div className={s.message}>{props.dialog.messages[props.dialog.messages.length - 1].content}</div>
                </div>
            </div>
        </div>
    )
}