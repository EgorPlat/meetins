import { useUnit } from "effector-react";
import React, { useEffect } from "react";
import { getMyDialogs, isMyDialogsLoaded, myDialogs, setMyDialogs } from "../../../../global/store/chat_model";
import { $user } from "../../../../global/store/store";
import UserChatCard from "../UserChatCard/userChatCard";
import s from "./chatList.module.scss";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";
 
export default function ChatList(): JSX.Element {

    const myDialogs$ = useUnit(myDialogs);
    const isLoaded$ = useUnit(isMyDialogsLoaded);
    const authedUser$ = useUnit($user);
    
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
                { isLoaded$ && myDialogs$?.length === 0 && 
                    <span className={s.noDialogsMessage}>
                        <span style={{ color: "var(--text-color)" }}>У вас нет диалогов.</span> Перейдите в профиль к любому пользователю и нажмите "диалог"
                    </span>
                }
                { isLoaded$ && myDialogs$ !== null && authedUser$ ? myDialogs$.map( dialog => 
                    <UserChatCard
                        key={dialog.dialogId}
                        dialog={dialog}
                        authedUser={authedUser$}
                    />) : <CustomLoader />}
            </div>
        </div>
    )
}