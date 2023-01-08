import { useStore } from "effector-react";
import { useEffect } from "react";
import { getMyDialogs, isMyDialogsLoaded, myDialogs } from "../../../global/store/chat_model";
import { $user } from "../../../global/store/store";
import UserChatCard from "../userChatCard/userChatCard";
import s from "./mobileChatList.module.scss";

export default function MobileChatList(): JSX.Element {

    const myDialogs$ = useStore(myDialogs);
    const isLoaded$ = useStore(isMyDialogsLoaded);
    const authedUser$ = useStore($user);

    useEffect(() => {
        getMyDialogs(); 
    },[]);
    return(
        <div className={s.mobileChatList}>
            {isLoaded$ !== false && myDialogs$ !== null 
                ? 
                myDialogs$.map( dialog => {
                    const lastMessage = dialog.messages[dialog.messages.length - 1];
                    const isUnreadMessageMy = lastMessage.senderId === authedUser$.userId;
                    return (
                        <div className={s.mobileUserChatCard}>
                            <UserChatCard
                                key={dialog.userAvatar}
                                dialog={dialog}
                                authedUser={authedUser$}
                            />
                            <div className={s.mobileUserChatCardLastMessage}>
                                <div className={s.mobileLastMessage}>
                                    {!lastMessage.isRead && isUnreadMessageMy && <div className={s.mobileNotMyChatRound}></div> }
                                    {!lastMessage.isRead && !isUnreadMessageMy && <div className={s.mobileMyChatRound}></div> }
                                    {dialog.messages[dialog.messages.length - 1].content}
                                </div>
                            </div>
                        </div>
                    )
                }) 
                : <div className={s.loader}></div>
            }
        </div>
    )
}