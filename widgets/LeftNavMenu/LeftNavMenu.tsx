import { useUnit } from "effector-react";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import s from "./LeftNavMenu.module.scss";
import { $user } from "../../global/store/store";
import { isUserUnReadMessagesExists } from "../../global/store/chat_model";

export default function LeftNavMenu(): JSX.Element {

    const { t } = useTranslation();
    const isUserUnReadMessagesExists$ = useUnit(isUserUnReadMessagesExists);
    const user = useUnit($user);
    
    return(
        <div className={s.ul}>        
            <div className={s.messangerLink}>
                <Link href="/messanger">{t("Мессенджер")}</Link>
                {isUserUnReadMessagesExists$ && <div className={s.count}></div>}
            </div>
            <div>
                <Link href="/invites">{t("Приглашения")}</Link>
            </div>
            <div className={s.marksLink}>
                <Link href="/marks">{t("Закладки")}</Link>
                <div className={s.countMarks}>
                    {user ? user.events.length + user.markedUsers.length : 0}
                </div>
            </div>
            <div className={s.musicLink}>
                <Link href="/music">{t("Музыка")}</Link>
            </div>
        </div> 
    )
}