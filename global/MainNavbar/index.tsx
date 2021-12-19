import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMemo } from "react";
import s from './mainNavbar.module.scss';

export default function MainNavbar(props: {currentPage: string}): JSX.Element {

	const [select, setSelect] = useState<string>("");
	const router = useRouter();

	const changeSelect = (value: string) => {
		setSelect( () => value);
	}
	useMemo(() => {
		if(select === 'logOut') {
			localStorage.setItem('isLogged', 'false');
			router.push('/login');
		}
		if(select === 'settings') {
			router.push('/profile/settings');
		}
		if(select === 'name') {
			router.push('/profile');
		}
	}, [select]) 
    return(
        <nav className={s.nav}>
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
				<li className={s.navlink}>
				  <Link href='/profile' passHref>
				   <img 
				    src="https://upload.wikimedia.org/wikipedia/commons/8/87/Igor_V._Rybakov_TN.jpg" 
					alt="Аватарка" 
					className={`${s.round} ${s.avatar}`}
				   />
				  </Link>
				</li>
				<li className={s.navlink}>
				  <select className={s.select} onChange={(event) => changeSelect(event.target.value)}>
				      <option className={s.option} value="name">Дима</option>
					  <option className={s.option} value="logOut">Выход</option>
					  <option className={s.option} value="settings">Настройки</option>
				  </select>
				</li>
			</ul>
		</nav>
    )
}