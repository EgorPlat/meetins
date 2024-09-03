import { useStore } from "effector-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import s from "./mainNavbar.module.scss"; 
import { useTranslation } from "react-i18next";
import { $user, baseURL } from "../../global/store/store";
import { connection, setNewConnection } from "../../global/store/connection_model";
import { handleLogOut } from "../../global/store/login_model";
import ButtonWithHint from "../../shared/ui/Hint/buttonWithHint";

export default function MainNavbar(props: {currentPage: string}): JSX.Element {

    const { t } = useTranslation();

    const [select, setSelect] = useState<string>("");
    const user = useStore($user);
    const router = useRouter();
    const ref = useRef<any>();
    const userAvatar = user?.avatar || "no-avatar.jpg";
    const connection$ = useStore(connection);

    const handleAvatarClick = () => {
        setSelect("name");
        ref.current.selectedIndex = ref.current.options[0];
    };

    useEffect(() => {
        if( select === "logOut" ) {
            handleLogOut();
            if (connection$) {
                connection$.disconnect();
            }
            router.push("/login");
            setNewConnection(null);	
        }
        if( select === "settings" ) {
            router.push("/settings");
        }
        if(select === "name") {
            if (router.asPath !== `/profile/${user?.login}`) router.push(`/profile/${user?.login}`);
        }
        if(select === "comeBack") {
            router.push(`/profile/${user?.login}`);
        }
        ref.current.selectedIndex = ref.current.options[0];
        setSelect("");
    }, [select]);

    return(
        <div className={s.link}>
            <div className={s.navBlock}>
                <Link href="/peoples">{t("Люди")}</Link>
                <Link href="/events">{t("События")}</Link>
                <Link href="/interests">{t("Интересы")}</Link>
                <Link href="/meetings">{t("Встречи")}</Link>
            </div>
            <div className={s.userBlock}>
                <ButtonWithHint
                    fontSize={20}
                    title={t("Пригласить")} 
                    hintTitle={
                        t("Вы можете приглашать пользователей на мерпориятия которые есть в ваших закладках, для этого перейдите к ним в профиль и нажмите кнопку 'Пригласить'")
                    } 
                />
                <img 
                    src={baseURL + userAvatar} 
                    className={s.round} 
                    alt="Аватарка" 
                    width={70} 
                    height={70} 
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