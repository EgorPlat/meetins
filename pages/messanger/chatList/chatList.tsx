import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getMyDialogs, isMyDialogsLoaded, myDialogs, setMyDialogs } from "../../../global/store/chat_model";
import { $user } from "../../../global/store/store";
import UserChatCard from "../userChatCard/userChatCard";
import s from "./chatList.module.scss";
import CustomLoader from "../../../components-ui/CustomLoader/CustomLoader";
 
export default function ChatList(): JSX.Element {

    const myDialogs$ = useStore(myDialogs);
    const isLoaded$ = useStore(isMyDialogsLoaded);
    const authedUser$ = useStore($user);
    const { t } = useTranslation();
    
    useEffect(() => {
        getMyDialogs(true);
        return () => {
            setMyDialogs([]);
        }
    },[])

    return(  
        <div className={s.chatList}>
            <div className={s.menu}>
                <button>{t('Все')}</button>
                <button>{t('Онлайн')}</button>
                <button>{t('Важные')}</button>
                <button>{t('Поиск')}</button>
            </div>
            <div className={s.list}>
                {isLoaded$ !== false && myDialogs$ !== null ? myDialogs$.map( dialog => 
                <UserChatCard
                    key={dialog.dialogId}
                    dialog={dialog}
                    authedUser={authedUser$}
                />) : <CustomLoader />}
            </div>
        </div>
    )
}