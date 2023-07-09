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
import ButtonWithHint from "../../global/helpers/Hint/buttonWithHint";

export default function MainNavbar(props: {currentPage: string}): JSX.Element {

	const { t, i18n } = useTranslation();

	const [select, setSelect] = useState<string>("");
	const user = useStore($user);
	const router = useRouter();
	const ref = useRef<any>();
	const userAvatar = user?.avatar || 'no-avatar.jpg';

	useEffect(() => {
		ref.current.selectedIndex = ref.current.options[0];
		if(select === 'logOut') {
			router.push('/login');
			localStorage.setItem('access-token', "");
			localStorage.setItem('refrash-token', "");
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
	}, [select]);

    return(
		<div className={s.link}>
				<Link href="/peoples">{t('Люди')}</Link>
				<Link href="/events">{t('События')}</Link>
				<Link href="">{t('Встречи')}</Link>
				<Link href="">{t('Интересы')}</Link>
			    <ButtonWithHint 
					title={t('Пригласить')} 
					hintTitle={
						`Вы можете приглашать пользователей на мерпориятия которые есть в ваших закладках,
						для этого перейдите к ним в профиль и нажмите кнопку "Пригласить"`
					} 
				/>
			    <img 
					src={baseURL + userAvatar} 
					className={s.round} 
					alt="Аватарка" 
					width={70} 
					height={70} 
					onClick={() => setSelect('name')}
				/>
			    <select ref={ref} className={s.select} onChange={(event) => setSelect(event.target.value)}>
				    <option className={s.option} value="name">{user?.name}</option>
				    <option className={s.option} value="logOut">{t('Выход')}</option>
				    <option className={s.option} value="settings">{t('Настройки')}</option>
				    <option className={s.option} value="comeBack">{t('Вернуться')}</option>
			    </select>
		</div>
    )
}