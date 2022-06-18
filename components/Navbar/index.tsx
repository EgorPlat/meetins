import Link from 'next/link'
import s from './navbar.module.scss'
export default function Navbar(props: { currentPage: string }): JSX.Element {
	return (
		<nav className={s.nav}>
			<ul>    
				<li
					className={
						props.currentPage === '/login'
							? `${s.navLink} ${s.activeLink}`
							: `${s.navLink}`
					}>
					<Link href='/login'>Вход</Link>
				</li>
				<li
					className={
						props.currentPage === '/register'
							? `${s.navLink} ${s.activeLink}`
							: `${s.navLink}`
					}>
					<Link href='/register'>Регистрация</Link>
				</li>
			</ul>
		</nav>
	)
}
