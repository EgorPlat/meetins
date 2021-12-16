import s from './header.module.scss'
import Image from 'next/image'
import logo from '../../public/images/logo.svg'
import Navbar from '../Navbar'
import Link from 'next/link'
import { $currentPage } from '../store/store'
import { useStore } from 'effector-react'
import MainNavbar from '../MainNavbar'

export default function Header(): JSX.Element {
	const currentPage = useStore($currentPage)
	let headerBgClass
	if (currentPage === '/') {
		headerBgClass = s.headerMainPage
	} else if (currentPage === '/login' || currentPage === '/register') {
		headerBgClass = s.headerAuthPage
	} else if (currentPage === '/profile') {
		headerBgClass = s.headerProfilePage
	}
	return (
		<header className={`${s.header} ${headerBgClass}`}>
			<Link href='/' passHref>
				<div className={s.logo}>
					<Image
						className={s.logoImage}
						src={logo}
						alt='company logo'
						width={60}
				 		height={60}
					/>
					<span className={s.logoText}>M</span>
				</div>
			</Link>

			{ currentPage === "/" || currentPage === "/login" || currentPage === "/register" ? <Navbar currentPage={currentPage} /> : <MainNavbar currentPage={currentPage} />}
		</header>
	)
}
