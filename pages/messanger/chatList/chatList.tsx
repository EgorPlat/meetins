import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { getMyDialogs, myDialogs } from "../../../global/store/chat_model";
import UserChatCard from "../userChatCard/userChatCard";
import s from "./chatList.module.scss";
 
export default function ChatList(): JSX.Element {

    const myDialogs$ = useStore(myDialogs);

    useEffect(() => {
        getMyDialogs().then((response) => {
            if(response?.status === 200) {
                console.log('ChatList - getMyDialogs');
                console.log(response.data);
            }
        })
    },[])
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
                {myDialogs$ !== null ? myDialogs$.map( user => 
                <UserChatCard
                    key={user.userAvatar}
                    user={user}
                />) : null}
            </div>
        </div>
    )
}