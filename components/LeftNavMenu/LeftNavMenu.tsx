import { useStore } from "effector-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { $currentPage } from "../../global/store/store";
import s from "./LeftNavMenu.module.scss";

export default function LeftNavMenu(): JSX.Element {

    const currentPage = useStore($currentPage)

    return(
        <ul className={s.ul}>        
            <li><Link href="/messanger">Мессенджер</Link></li>
            <li><Link href="">Приглашения</Link></li>
            <li><Link href="/marks">Закладки</Link></li>
        </ul> 
    )
}