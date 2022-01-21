import { useStore } from "effector-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { $user, baseURL, setUser } from "../store/store";
import s from './mainNavbar.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MainNavbar(props: {currentPage: string}): JSX.Element {

	const [select, setSelect] = useState<string>("");
	const user = useStore($user);
	const router = useRouter();
	const ref = useRef<any>();

	const changeSelect = (value: string) => {
		setSelect( () => value);
	}
	const avatarNavigation = () => {
		changeSelect('name');
		ref.current.selectedIndex = ref.current.options[0];
		router.push(`/profile/${user?.loginUrl}`);
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
			router.push(`/profile/${user?.loginUrl}`);
		}
	}, [select])
    return(
		<div className={s.navCont}>
		<div className={s.navBtn}>
			<div className={s.link}>
			    <Link href="/peoples">Люди</Link>
			    <Link href="">События</Link>
			    <Link href="">Встречи</Link>
			    <Link href="">Интересы</Link>
			</div>
		</div>
		<div className={s.navAvatar}>
			<div className={s.avSelect}>
			{ user?.avatar !== undefined 
			?
			<img src={baseURL + user.avatar} className={s.round} alt="Аватарка" width={70} height={70} onClick={avatarNavigation}/>
			: null }
			<select ref={ref} className={s.select} onChange={(event) => changeSelect(event.target.value)}>
				<option className={s.option} value="name">{user?.firstName}</option>
				<option className={s.option} value="logOut">Выход</option>
				<option className={s.option} value="settings">Настройки</option>
			</select>
			</div>
		</div>
	    </div>
    )
}