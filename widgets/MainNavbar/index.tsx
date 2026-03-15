"use client"
import React, { JSX, useState } from "react";
import { useUnit } from "effector-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { $user, baseURL } from "../../global/store/store";
import { connection, setNewConnection } from "../../global/store/connection_model";
import { handleLogOut } from "../../global/store/login_model";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import s from "./mainNavbar.module.scss"; 
import { MusicControlBlock } from "../MusicControlBlock/musicControlBlock";

const CustomButtonWithHint = dynamic(() => import("../../shared/ui/CustomButtonWithHint/CustomButtonWithHint"));

export default function MainNavbar(): JSX.Element {

    const { t } = useTranslation();

    const [select, setSelect] = useState<string>("");
    const user = useUnit($user);
    const router = useRouter();
    const pathName = usePathname();
    const ref = useRef<any>(null);
    const connection$ = useUnit(connection);

    const handleAvatarClick = () => {
        if (user) {
            setSelect("");
            ref.current.selectedIndex = ref.current.options[0];
            router.push(`/profile/${user.login}`);
        }
    };

    useEffect(() => {
        if (user) {
            if( select === "logOut" ) {
                handleLogOut();
                if (connection$) {
                    connection$.disconnect();
                }
                router.push("/auth/login");
                setNewConnection(null);	
            }
            if( select === "settings" ) {
                router.push("/settings");
            }
            if(select === "name" && user) {
                if (pathName !== `/profile/${user?.login}`) router.push(`/profile/${user.login}`);
            }
            if(select === "comeBack" && user) {
                router.push(`/profile/${user.login}`);
            }
            ref.current.selectedIndex = ref.current.options[0];
            setSelect("");
        }
    }, [select]);

    return(
        <div className={s.link}>
            <div className={s.navBlock}>
                <MusicControlBlock />
            </div>
            <div className={s.userBlock}>
                <CustomButtonWithHint
                    fontSize={18}
                    title={t("Пригласить")} 
                    hintTitle={
                        t("Вы можете приглашать пользователей на мерпориятия которые есть в ваших закладках, для этого перейдите к ним в профиль и нажмите кнопку 'Пригласить'")
                    } 
                />
                <Image 
                    src={baseURL + user?.avatar} 
                    className={s.round} 
                    alt="Аватарка" 
                    width={50} 
                    height={50} 
                    onClick={handleAvatarClick}
                />
                <select className={s.customSelect} ref={ref} onChange={(event) => setSelect(event.target.value)}>
                    <option value="name">{user?.name}</option>
                    <option value="logOut">{t("Выход")}</option>
                    <option value="settings">{t("Настройки")}</option>
                    <option value="comeBack">{t("Вернуться")}</option>
                </select>
            </div>
        </div>
    )
}