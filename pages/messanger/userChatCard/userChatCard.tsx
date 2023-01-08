import { useStore } from "effector-react";
import React from "react";
import { IMyDialog, User } from "../../../global/interfaces";
import { activeChat, setActiveChat } from "../../../global/store/chat_model";
import { baseURL } from "../../../global/store/store";
import calculateCountOfUnredMessageInDialog from "../../../global/helpers/helper";
import s from "./userChatCard.module.scss";

export default function UserChatCard(props: { dialog: IMyDialog, authedUser: User }): JSX.Element {

    const activeChat$ = useStore(activeChat);
    const countUnrededMessageInDialog = calculateCountOfUnredMessageInDialog(props.dialog?.messages, props.authedUser);
    
    const chooseChat = () => { 
        if(activeChat$.dialogId !== props.dialog.dialogId) {
            setActiveChat(props.dialog);
        }
    } 
    return(
        <div className={s.chat} onClick={chooseChat}>
            <div className={s.avatar} style={{backgroundImage: `url('${baseURL + props.dialog?.userAvatar}')`}}>
            </div>
            <div className={s.name}>
                {props.dialog?.userName}
                {countUnrededMessageInDialog !== 0 && <div className={s.unreadMessagesCounter}>{countUnrededMessageInDialog}</div>}
            </div>
        </div>
    )
}