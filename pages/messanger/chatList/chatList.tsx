import React, { useEffect } from "react";
import { IActiveChat, IMessage } from "../../../global/store/chat_model";
import { instance } from "../../../global/store/store";
import UserChatCard from "../userChatCard/userChatCard";
import s from "./chatList.module.scss";
 
export default function ChatList(): JSX.Element {

    const users: IActiveChat[] = [
    {
        name: "Danila", 
        avatar: "https://games.mail.ru/hotbox/content_files/gallery/2020/12/11/d49a024e7ade40858a10df3b8976625d.png", 
        messages: [
            {userID: "1234", text: "Hello!"},
            {userID: "1234", text: "What are u doing now?!"},
            {userID: "id35578", text: "Bro? i am sleeping!"},
            {userID: "id35578", text: "Just write me later, please!"}
        ], 
        status: false
    },
    {
        name: "Egor", 
        avatar: "https://yt3.ggpht.com/ytc/AKedOLR5SFoAqZJr72IT2OrW9grrZMQ2bxSRVnBJsG6nFQ=s900-c-k-c0x00ffffff-no-rj", 
        messages: [
            {userID: "1235", text: "Hello bro - do u want to walk with me?!"},
            {userID: "id35578", text: "Hello - yes i do!"},
            {userID: "id35578", text: "Where would u walking?"},
            {userID: "id35578", text: "Its park or maybe some event?"},
            {userID: "1235", text: "Oo, it will be surprise!"}
        ], 
        status: true
    }]
    return(
        <div className={s.chatList}>
            <h3>Чаты</h3>
            <div className={s.menu}>
                <button>Все</button>
                <button>Онлайн</button>
                <button>Важные</button>
                <button>Поиск</button>
            </div>
            <div className={s.list}>
                {users.map( user => 
                <UserChatCard
                    key={user.avatar}
                    user={user}
                />)}
            </div>
        </div>
    )
}