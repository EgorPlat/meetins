import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { getMyDialogs, isMyDialogsLoaded, myDialogs, setMyDialogs } from "../../../../global/store/chat_model";
import { $user } from "../../../../global/store/store";
import UserChatCard from "../UserChatCard/userChatCard";
import s from "./chatList.module.scss";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";
 
export default function ChatList(): JSX.Element {

    const myDialogs$ = useStore(myDialogs);
    const isLoaded$ = useStore(isMyDialogsLoaded);
    const authedUser$ = useStore($user);
    
    useEffect(() => {
        getMyDialogs(true);
        return () => {
            setMyDialogs([]);
        }
    },[])

    return(  
        <div className={s.chatList}>
            <div className={s.menu}>
                Диалоги
            </div>
            <div className={s.list}>
                { isLoaded$ && myDialogs$?.length === 0 && <span className={s.noDialogsMessage}>У вас нет диалогов</span>}
                { isLoaded$ && myDialogs$ !== null ? myDialogs$.map( dialog => 
                    <UserChatCard
                        key={dialog.dialogId}
                        dialog={dialog}
                        authedUser={authedUser$}
                    />) : <CustomLoader />}
            </div>
        </div>
    )
}