import { useStore } from "effector-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PageContainer from "../../components/pageContainer/pageContainer";
import { activeChat, getMyDialogs } from "../../global/store/chat_model";
import ChatList from "./chatList/chatList";
import ChatZone from "./chatZone/chatZone";
import s from "./messanger.module.scss";

export default function Messanger(): JSX.Element {
    
    const activeChat$ = useStore(activeChat);

    return(
        <PageContainer>
            <div className={s.messangerContent}>
                <div className={`${s.chatList} ${s.block}`}>
                    <ChatList/>
                </div>
                <div className={`${s.chatZone} ${s.block}`} style={{marginLeft: '1%'}}>
                    {activeChat$.dialogId ? <ChatZone/> : 
                    <div className={s.noChat}>
                        <h3 className={s.alert}>Выберите диалог...</h3>
                    </div>
                    }
                </div>
            </div>
        </PageContainer>
    )
}