import { useUnit } from "effector-react";
import { JSX, useEffect, useRef } from "react";
import { IMyDialog } from "@/entities";
import { myDialogs, isMyDialogsLoaded, getDialogMessages, getMyDialogs } from "@/global/store/chat_model";
import { $user } from "@/global/store/store";
import UserChatCard from "../UserChatCard/userChatCard";
import s from "./mobileChatList.module.scss";

export default function MobileChatList(): JSX.Element {

    const myDialogs$ = useUnit(myDialogs);
    const isLoaded$ = useUnit(isMyDialogsLoaded);
    const authedUser$ = useUnit($user);
    const ref = useRef(null);

    const handleGetDialogMessages = (dialog: IMyDialog) => {
        getDialogMessages(dialog);
    };

    useEffect(() => {
        getMyDialogs(false);
        if (ref.current && window.screen.height <= 670) {
            ref.current.scrollIntoView({ behaviour: "smooth" });
        }
    }, []);
    
    
    return(
        <div className={s.mobileChatList} ref={ref}>
            {isLoaded$ && myDialogs$
                ? 
                myDialogs$.map( dialog => {
                    const lastMessage = dialog.messages[dialog.messages?.length - 1];
                    const isUnreadMessageMy = lastMessage.senderId === authedUser$?.userId;
                    return (
                        <div className={s.mobileUserChatCard} key={dialog.dialogId}>
                            <UserChatCard
                                key={dialog.userAvatar}
                                dialog={dialog}
                                authedUser={authedUser$}
                            />
                            <div 
                                className={s.mobileUserChatCardLastMessage} 
                                onClick={() => handleGetDialogMessages(dialog)}
                            >
                                <div>
                                    {!lastMessage.isRead && isUnreadMessageMy && <div className={s.mobileNotMyChatRound}></div> }
                                    {!lastMessage.isRead && !isUnreadMessageMy && <div className={s.mobileMyChatRound}></div> }
                                </div>
                                <div className={s.mobileLastMessage}>
                                    {dialog.messages[dialog.messages?.length - 1].content}
                                </div>
                            </div>
                        </div>
                    )
                }) 
                : <div className={s.loader}></div>
            }
            {
                isLoaded$ && myDialogs$?.length === 0 && 
                <div className={s.notify}>
                    Вы еще ни с кем не начали диалог.
                    <div className={s.notifyDesc}>
                        Чтобы начать перейдите в Люди затем выберите пользователя кликнув на Аватар, после этого
                        Вы перейдете к нему в профиль и можете нажать Диалог
                    </div>
                </div>
            }
        </div>
    )
}