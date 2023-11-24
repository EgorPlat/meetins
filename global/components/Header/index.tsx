import s from './header.module.scss'
import Image from 'next/image'
import logo from '../../../public/images/logo-l.svg'
import { useStore } from 'effector-react'
import MainNavbar from '../MainNavbar'
import { useRouter } from 'next/router'
import { $currentPage, isMobile } from '../../../global/store/store'
import 'bootstrap/dist/css/bootstrap.min.css';

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
		//window.location.reload();
	}
	return (   
		<div className={`${s.header} ${headerBgClass}`}>
			<div className={s.logo} onClick={logOut}>
				<Image  
					className={s.logoImage}
					src={logo}
					alt='company logo'
					width={isMobile$ ? 260 : 330}
				 	height={isMobile$ ? 40 : 60}
				/>
			</div>
			<MainNavbar currentPage={currentPage} />
		</div>
	)
}
