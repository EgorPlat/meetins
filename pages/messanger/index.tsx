import { useStore } from "effector-react";
import React, { useEffect, useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import { IMyDialog } from "../../global/interfaces";
import { activeChat, setActiveChat } from "../../global/store/chat_model";
import { isMobile } from "../../global/store/store";
import ChatList from "./chatList/chatList";
import ChatZone from "./chatZone/chatZone";
import s from "./messanger.module.scss";
import MobileChatList from "./mobileChatList/mobileChatList";
import { defaultDialog } from "../../global/mock/defaultDialog";

export default function Messanger(): JSX.Element {
    
    const activeChat$ = useStore(activeChat);
    const isMobile$ = useStore(isMobile);
     
    const handleBack = () => {
        setActiveChat(defaultDialog);
    }
    const isChatNeededToShow = activeChat$.dialogId !== null || Boolean(activeChat$.dialogId);
    
    return(
        <PageContainer> 
           { !isMobile$ 
            ? 
            <div className={s.messangerContent}>
                <div className={`${s.chatList} ${s.block}`}>
                    <ChatList/>
                </div>
                <div className={`${s.chatZone}`}>
                    {isChatNeededToShow ? <ChatZone activeChat$={activeChat$} /> : 
                    <div className={s.noChat}>
                        <h3 className={s.alert}>Выберите диалог...</h3>
                    </div>
                    }
                </div>
            </div>
            :
            <div className={s.mobileMessangerContent}>
                {
                    !isChatNeededToShow 
                    ? <MobileChatList /> 
                    : 
                    <div className={`${s.mobileChatZone}`}>
                        <div className={s.mobileChatZoneBack} onClick={handleBack}>{`< Назад`}</div>
                        <div className={s.mobileChatZoneContent}>
                            <ChatZone activeChat$={activeChat$} />
                        </div>
                    </div>
                }
            </div>
            }
        </PageContainer>
    )
}