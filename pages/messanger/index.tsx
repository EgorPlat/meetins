import React from "react";
import PageContainer from "../../components/pageContainer/pageContainer";
import ChatList from "./chatList/chatList";
import ChatZone from "./chatZone/chatZone";
import s from "./messanger.module.scss";

export default function Messanger(): JSX.Element {
    return(
        <PageContainer>
            <div className={s.messangerContent}>
                <div className={s.chatList}>
                    <ChatList/>
                </div>
                <div className={s.chatZone}>
                    <ChatZone/>
                </div>
            </div>
        </PageContainer>
    )
}