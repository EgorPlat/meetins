"use client";
import { useUnit } from "effector-react";
import { activeChat, setActiveChat } from "@/global/store/chat_model";
import { isMobile } from "@/global/store/store";
import React, { JSX, useEffect } from "react";
import ChatList from "@/components/messanger/ChatList/chatList";
import ChatZone from "@/components/messanger/ChatZone/chatZone";
import MobileChatList from "@/components/messanger/MobileChatList/mobileChatList";
import s from "./messanger.module.scss";

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
        <>
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
        </>
    )
}