"use client";
import { useUnit } from "effector-react";
import { activeChat } from "@/global/store/chat_model";
import { isMobile } from "@/global/store/store";
import React, { JSX } from "react";
import ChatList from "@/components/messanger/ChatList/chatList";
import ChatZone from "@/components/messanger/ChatZone/chatZone";
import MobileChatList from "@/components/messanger/MobileChatList/mobileChatList";
import s from "./messanger.module.scss";

export default function Messanger(): JSX.Element {

    const activeChat$ = useUnit(activeChat);
    const isMobile$ = useUnit(isMobile);
    const isChatNeededToShow = Boolean(activeChat$?.userId);

    if (isMobile$) {
        return (
            <div className={s.mobileMessangerContent}>
                {
                    !isChatNeededToShow
                        ? <MobileChatList />
                        : <ChatZone activeChat$={activeChat$} />
                }
            </div>
        )
    } else {
        return (
            <div className={s.messangerContent}>
                {
                    isChatNeededToShow 
                        ? <div className={s.chatZone}>
                            <ChatZone activeChat$={activeChat$} />
                        </div>
                        : <div className={s.chatList}>
                            <ChatList />
                        </div>
                }
            </div>
        )
    }
}