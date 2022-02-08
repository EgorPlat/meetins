import Link from "next/link";
import React from "react";
import s from "./chatList.module.scss";

export default function ChatList(): JSX.Element {
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
                
            </div>
        </div>
    )
}