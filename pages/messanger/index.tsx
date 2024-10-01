import { useUnit } from "effector-react";
import { activeChat, setActiveChat } from "../../global/store/chat_model";
import { isMobile } from "../../global/store/store";
import React, { useEffect } from "react";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import ChatList from "./components/ChatList/chatList";
import ChatZone from "./components/ChatZone/chatZone";
import s from "./messanger.module.scss";
import MobileChatList from "./components/MobileChatList/mobileChatList";

export default function Messanger(): JSX.Element {

    const activeChat$ = useUnit(activeChat);
    const isMobile$ = useUnit(isMobile);
    const isChatNeededToShow = Boolean(activeChat$?.userId);

    useEffect(() => {
        return () => {
            setActiveChat(null);
        }
    }, []);

    return (
        <PageContainer>
            {!isMobile$
                ?
                <div className={s.messangerContent}>
                    <div className={`${s.chatList}`}>
                        <ChatList />
                    </div>
                    <div className={`${s.chatZone}`}>
                        {isChatNeededToShow ? <ChatZone activeChat$={activeChat$} /> :
                            <div className={s.noChat}>
                                <h5 className={s.alert}>Выберите диалог...</h5>
                            </div>
                        }
                    </div>
                </div>
                :
                <div className={s.mobileMessangerContent}>
                    {
                        !isChatNeededToShow
                            ? <MobileChatList />
                            : <ChatZone activeChat$={activeChat$} />
                    }
                </div>
            }
        </PageContainer>
    )
}