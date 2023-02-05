import { useStore } from "effector-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import s from './mainNavbar.module.scss'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { $user, baseURL, isMobile, setUser } from "../../global/store/store";
import { useTranslation } from "react-i18next";

export default function MainNavbar(props: {currentPage: string}): JSX.Element {

	const { t, i18n } = useTranslation();

	const [select, setSelect] = useState<string>("");
	const user = useStore($user);
	const isMobile$ = useStore(isMobile);
	const userAvatar = user?.avatar || 'no-avatar.jpg';
	const router = useRouter();
	const ref = useRef<any>();

	const changeSelect = (value: string) => {
		setSelect( () => value);
	}
	const avatarNavigation = () => {
		changeSelect('name');
		ref.current.selectedIndex = ref.current.options[0];
		router.push(`/profile/${user?.login}`);
	}
	useEffect(() => {
		if(select === 'logOut') {
			localStorage.setItem('access-token', "");
			localStorage.setItem('refrash-token', "");
			setUser(null);
			router.push('/login');
		}
		if(select === 'settings') {
			router.push('/settings');
		}
		if(select === 'name') {
			router.push(`/profile/${user?.login}`);
		}
		if(select === 'comeBack') {
			router.push(`/profile/${user?.login}`);
		}
	}, [select])
    return(
		<div className={s.link}>
				<Link href="/peoples">{t('Люди')}</Link>
				<Link href="/events">{t('События')}</Link>
				<Link href="">{t('Встречи')}</Link>
				<Link href="">{t('Интересы')}</Link>
			    <button className={s.inviteBtn}>{t('Пригласить')}</button>
			    <img src={baseURL + userAvatar} className={s.round} alt="Аватарка" width={70} height={70} onClick={avatarNavigation}/>
			    <select ref={ref} className={s.select} onChange={(event) => changeSelect(event.target.value)}>
				    <option className={s.option} value="name">{user?.name}</option>
				    <option className={s.option} value="logOut">{t('Выход')}</option>
				    <option className={s.option} value="settings">{t('Настройки')}</option>
				    <option className={s.option} value="comeBack">{t('Вернуться')}</option>
			    </select>
		</div>
    )
}