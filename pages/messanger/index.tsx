import { useUnit } from "effector-react";
import { activeChat, setActiveChat } from "../../global/store/chat_model";
import { isMobile } from "../../global/store/store";
import React, { useEffect } from "react";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import ChatList from "./components/ChatList/chatList";
import ChatZone from "./components/ChatZone/chatZone";
import s from "./messanger.module.scss";
import MobileChatList from "./components/MobileChatList/mobileChatList";
import { defaultDialog } from "../../global/mock/defaultDialog";

export default function Messanger(): JSX.Element {

    const activeChat$ = useUnit(activeChat);
    const isMobile$ = useUnit(isMobile);

    const isChatNeededToShow = Boolean(activeChat$?.userId);
    
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
        return () => {
            setActiveChat(defaultDialog);
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
                            : <ChatZone activeChat$={activeChat$} />
                    }
                </div>
            }
        </PageContainer>
    )
}