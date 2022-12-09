import { useStore } from "effector-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { countUreadMessages } from "../../global/store/chat_model";
import { $currentPage } from "../../global/store/store";
import s from "./LeftNavMenu.module.scss";

export default function LeftNavMenu(): JSX.Element {

    const currentPage = useStore($currentPage);
    const unreadMessages = useStore(countUreadMessages);

    useEffect(() => {
        console.log(unreadMessages);
    }, [unreadMessages])
    return(
        <ul className={s.ul}>        
            <li><Link href="/messanger">{`Мессенджер`}</Link><div className={s.count}>{unreadMessages}</div></li>
            <li><Link href="">Приглашения</Link></li>
            <li><Link href="/marks">Закладки</Link></li>
        </ul> 
    )
}