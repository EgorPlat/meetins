import { useStore } from "effector-react";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { countUreadMessages } from "../../global/store/chat_model";
import { $currentPage } from "../../global/store/store";
import s from "./LeftNavMenu.module.scss";

export default function LeftNavMenu(): JSX.Element {

    const currentPage = useStore($currentPage);
    const { t } = useTranslation();
    const unreadMessages = useStore(countUreadMessages);
    
    return(
        <ul className={s.ul}>        
            <li className={s.messangerLink}>
                <Link href="/messanger">{t('Мессенджер')}</Link>
                {unreadMessages !== 0 && <div className={s.count}></div>}
            </li>
            <li><Link href="/invites">{t('Приглашения')}</Link></li>
            <li><Link href="/marks">{t('Закладки')}</Link></li>
        </ul> 
    )
}