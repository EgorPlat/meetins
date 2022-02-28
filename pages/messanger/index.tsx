import { useStore } from "effector-react";
import React from "react";
import PageContainer from "../../components/pageContainer/pageContainer";
import { activeChat } from "../../global/store/chat_model";
import ChatList from "./chatList/chatList";
import ChatZone from "./chatZone/chatZone";
import s from "./messanger.module.scss";

export default function Messanger(): JSX.Element {
    
    const activeChat$ = useStore(activeChat);

    return(
        <PageContainer>
            <div className={s.messangerContent}>
                <div className={s.chatList}>
                    <ChatList/>
                </div>
                <div className={s.chatZone}>
                    {activeChat$ !== null ? <ChatZone activeChat = {activeChat$}/> : 
                    <div className={s.noChat}>
                        <h3 className={s.alert}>Выберите диалог...</h3>
                    </div>
                    }
                </div>
            </div>
        </PageContainer>
    )
}