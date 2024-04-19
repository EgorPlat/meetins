import { useStore } from "effector-react";
import React from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import { activeChat } from "../../global/store/chat_model";
import { isMobile } from "../../global/store/store";
import ChatList from "./components/ChatList/chatList";
import ChatZone from "./components/ChatZone/chatZone";
import s from "./messanger.module.scss";
import MobileChatList from "./components/MobileChatList/mobileChatList";

export default function Messanger(): JSX.Element {
    
    const activeChat$ = useStore(activeChat);
    const isMobile$ = useStore(isMobile);

    const isChatNeededToShow = Boolean(activeChat$.dialogId);
    
    return(
        <PageContainer> 
           { !isMobile$ 
            ? 
            <div className={s.messangerContent}>
                <div className={`${s.chatList}`}>
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
                        <ChatZone activeChat$={activeChat$} />
                    </div>
                }
            </div>
            }
        </PageContainer>
    )
}