import { useStore } from "effector-react";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import s from "./LeftNavMenu.module.scss";
import { isUserUnReadMessagesExists } from "../../store/chat_model";

export default function LeftNavMenu(): JSX.Element {

    const { t } = useTranslation();
    const isUserUnReadMessagesExists$ = useStore(isUserUnReadMessagesExists);
    
    return(
        <ul className={s.ul}>        
            <li className={s.messangerLink}>
                <Link href="/messanger">{t('Мессенджер')}</Link>
                {isUserUnReadMessagesExists$ && <div className={s.count}></div>}
            </li>
            <li><Link href="/invites">{t('Приглашения')}</Link></li>
            <li><Link href="/marks">{t('Закладки')}</Link></li>
            <li><Link href="/settings">{t('Музыка')}</Link></li>
        </ul> 
    )
}