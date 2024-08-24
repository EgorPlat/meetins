import { useStore } from "effector-react";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import s from "./LeftNavMenu.module.scss";
import { isUserUnReadMessagesExists } from "../../store/chat_model";
import { $user } from "../../store/store";

export default function LeftNavMenu(): JSX.Element {

    const { t } = useTranslation();
    const isUserUnReadMessagesExists$ = useStore(isUserUnReadMessagesExists);
    const user = useStore($user);
    
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
                <div className={s.countMarks}>{+user?.events.length + +user?.markedUsers.length}</div>
            </div>
            <div className={s.musicLink}>
                <Link href="/music">{t("Музыка")}</Link>
            </div>
        </div> 
    )
}