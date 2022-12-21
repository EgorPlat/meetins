import { useStore } from "effector-react";
import { useEffect } from "react";
import { getMyDialogs, isMyDialogsLoaded, myDialogs } from "../../../global/store/chat_model";
import UserChatCard from "../userChatCard/userChatCard";
import s from "./mobileChatList.module.scss";

export default function MobileChatList(): JSX.Element {

    const myDialogs$ = useStore(myDialogs);
    const isLoaded$ = useStore(isMyDialogsLoaded);

    useEffect(() => {
        getMyDialogs(); 
    },[]);
    return(
        <div className={s.mobileChatList}>
            {isLoaded$ !== false && myDialogs$ !== null 
                ? 
                myDialogs$.map( user => 
                    <div className={s.mobileUserChatCard}>
                        <UserChatCard
                            key={user.userAvatar}
                            user={user}
                        />
                        <div className={s.mobileUserChatCardLastMessage}>
                            <div className={s.mobileLastMessage}>
                                {!user.messages[user.messages.length - 1].isRead && <div className={s.mobileChatRound}></div>}
                                {user.messages[user.messages.length - 1].content}
                            </div>
                        </div>
                    </div>
                ) 
                : <div className={s.loader}></div>
            }
        </div>
    )
}