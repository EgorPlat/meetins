import s from './header.module.scss'
import Image from 'next/image'
import logo from '../../public/images/logo-l.svg'
import Navbar from '../Navbar'
import Link from 'next/link'
import { useStore } from 'effector-react'
import MainNavbar from '../MainNavbar'
import { useRouter } from 'next/router'
import { $currentPage, setCurrentPage } from '../../global/store/store'

export default function Header(): JSX.Element {
	const currentPage = useStore($currentPage);
	const router = useRouter();

	let headerBgClass
	if (currentPage === '/') {
		headerBgClass = s.headerMainPage
	} else if (currentPage === '/login' || currentPage === '/register') {
		headerBgClass = s.headerAuthPage
	} else if (currentPage === '/profile') {
		headerBgClass = s.headerProfilePage
	}
	const logOut = () => {
		localStorage.setItem('access-token', "");
		localStorage.setItem('refrash-token', "");
		setCurrentPage('/');
		localStorage.setItem('previousPage', "/");
	}
	return ( 
		<header className={`${s.header} ${headerBgClass}`}>
			{!(router.pathname === "/" || router.pathname === "/login" || router.pathname === "/register") ? <Link href='/' passHref>
				<div className={s.logo} onClick={logOut}>
					<Image  
						className={s.logoImage}
						src={logo}
						alt='company logo'
						width={270}
				 		height={80}
					/>
				</div>
	        </Link> : null}
			{ router.pathname === "/" || router.pathname === "/login" || router.pathname === "/register" 
			? <Navbar currentPage={currentPage} /> 
			: <MainNavbar currentPage={currentPage} />
			}
		</header>
	)
}
