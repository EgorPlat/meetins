import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { getMyDialogs, isMyDialogsLoaded, myDialogs } from "../../../global/store/chat_model";
import UserChatCard from "../userChatCard/userChatCard";
import s from "./chatList.module.scss";
 
export default function ChatList(): JSX.Element {

    const myDialogs$ = useStore(myDialogs);
    const isLoaded$ = useStore(isMyDialogsLoaded);

    useEffect(() => {
        getMyDialogs(); 
    },[]) 
    return(  
        <div className={s.chatList}>
            <div className={s.menu}>
                <button>Все</button>
                <button>Онлайн</button>
                <button>Важные</button>
                <button>Поиск</button>
            </div>
            <div className={s.list}>
                {isLoaded$ !== false && myDialogs$ !== null ? myDialogs$.map( user => 
                <UserChatCard
                    key={user.userAvatar}
                    user={user}
                />) : <div className={s.loader}></div>}
            </div>
        </div>
    )
}