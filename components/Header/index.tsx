import s from './header.module.scss'
import Image from 'next/image'
import logo from '../../public/images/new-logo.svg'
import Navbar from '../Navbar'
import Link from 'next/link'
import { useStore } from 'effector-react'
import MainNavbar from '../MainNavbar'
import { useRouter } from 'next/router'
import { $currentPage, isMobile, setCurrentPage } from '../../global/store/store'

export default function Header(): JSX.Element {
	const currentPage = useStore($currentPage);
	const router = useRouter();
	const isMobile$ = useStore(isMobile);

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
		<div className={`${s.header} ${headerBgClass}`}>
            <Link href='/' passHref>
				<div className={s.logo} onClick={logOut}>
					<Image  
						className={s.logoImage}
						src={logo}
						alt='company logo'
						width={270}
				 		height={120}
					/>
				</div>
	        </Link>
			{ router.pathname === "/" || router.pathname === "/login" || router.pathname === "/register" 
			? <Navbar currentPage={currentPage} /> 
			: <MainNavbar currentPage={currentPage} />
			}
		</div>
	)
}
