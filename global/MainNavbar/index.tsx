import { useStore } from "effector-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { $currentPage, $user, setCurrentPage } from "../store/store";
import s from './mainNavbar.module.scss';

export default function MainNavbar(props: {currentPage: string}): JSX.Element {

	const [select, setSelect] = useState<string>("");
	const user = useStore($user);
	const router = useRouter();
	const ref = useRef<any>();

	const changeSelect = (value: string) => {
		setSelect( () => value);
	}
	const avatarNavigation = () => {
		ref.current.selectedIndex = 0;
	    setSelect(() => ref.current[0].text);
	}
	useEffect(() => {
		if(select === 'logOut') {
			localStorage.setItem('access-token', "");
			localStorage.setItem('refrash-token', "");
			router.push('/login');
		}
		if(select === 'settings') {
			router.push('/settings');
		}
		if(select === 'name') {
			router.push('/profile');
		}
	}, [select])
    return(
        <nav className={s.nav}>
			<ul>  
				<span className={s.navLinks}>
				<ul>
				<li
					className={
						props.currentPage === '/peoples'
							? `${s.navLink} ${s.activeLink}`
							: `${s.navLink}`
					}>
					<Link href=''>Люди</Link>
				</li>
				<li
					className={
						props.currentPage === '/events'
							? `${s.navLink} ${s.activeLink}`
							: `${s.navLink}`
					}>
					<Link href=''>События</Link>
				</li>
				<li
					className={
						props.currentPage === '/interests'
							? `${s.navLink} ${s.activeLink}`
							: `${s.navLink}`
					}>
					<Link href=''>Интересы</Link>
				</li>
				</ul>
				</span>
				<li className={s.navlink}>
				  <Link href='/profile'>
				   <img 
				    onClick={avatarNavigation}
				    src={'https://api.meetins.ru/' + user?.userIcon}
					alt="Аватарка" 
					className={`${s.round} ${s.avatar}`}
				   />
				  </Link> 
				</li>
				<li className={s.navlink}>
				  <select ref={ref} className={s.select} onChange={(event) => changeSelect(event.target.value)}>
				      <option className={s.option} value="name">{user?.firstName}</option>
					  <option className={s.option} value="logOut">Выход</option>
					  <option className={s.option} value="settings">Настройки</option>
				  </select>
				</li>
			</ul>
		</nav>
    )
}