import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import s from './navbar.module.scss'
export default function Navbar(props: { currentPage: string }): JSX.Element {

	const { t } = useTranslation();

	return (
		<nav className={s.nav}>
			<ul>    
				<li
					className={
						props.currentPage === '/login'
							? `${s.navLink} ${s.activeLink}`
							: `${s.navLink}`
					}>
					<Link href='/login'>{t('Вход')}</Link>
				</li>
				<li
					className={
						props.currentPage === '/register'
							? `${s.navLink} ${s.activeLink}`
							: `${s.navLink}`
					}>
					<Link href='/register'>{t('Регистрация')}</Link>
				</li>
			</ul>
		</nav>
	)
}
