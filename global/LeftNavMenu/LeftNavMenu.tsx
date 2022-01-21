import Link from "next/link";
import React from "react";
import s from "./LeftNavMenu.module.scss";

export default function LeftNavMenu(): JSX.Element {
    return(
        <ul className={s.ul}>        
            <li><Link href="">Мессенджер</Link></li>
            <li><Link href="">Приглашения</Link></li>
            <li><Link href="">Закладки</Link></li>
        </ul> 
    )
}