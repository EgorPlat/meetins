import s from './header.module.scss'
import Image from 'next/image'
import logo from '../../../public/images/full-new-logo.svg'
import { useStore } from 'effector-react'
import MainNavbar from '../MainNavbar'
import { useRouter } from 'next/router'
import { $currentPage, isMobile } from '../../store/store'
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

	return (   
		<div className={`${s.header} ${headerBgClass}`}>
			<div className={s.logo}>
				<Image
					onClick={() => router.push('/about')}
					className={s.logoImage}
					src={logo}
					alt='company logo'
					width={190}
				/>
			</div>
			<MainNavbar currentPage={currentPage} />
		</div>
	)
}
