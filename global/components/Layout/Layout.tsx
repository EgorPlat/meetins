import s from './layout.module.scss'
import { useRouter } from 'next/dist/client/router'
import { $currentPage, isMobile, setCurrentPage } from '../../../global/store/store'
import { useStore } from 'effector-react'
import { useEffect } from 'react'
import Header from '../Header'

export default function Layout({ children }: { children: React.ReactNode }) {

	const route = useRouter();
	const isMobile$ = useStore(isMobile);

	const currentPage = useStore($currentPage)
	let backgroundClass = ''
	if (currentPage === '/login') {
		backgroundClass = s.loginPage
	} else if (currentPage === '/register') {
		backgroundClass = s.registerPage
	} else if (currentPage === '/') {
		backgroundClass = s.mainPage
	}
	useEffect(() => {
		if(route.asPath !== '/' && !route.asPath.includes('[' || ']')) {
			setCurrentPage(route.asPath);
			localStorage.setItem('previousPage', route.asPath);
		}
	}, [route.asPath]);
	
	return ( 
		<>
			<div className={`${s.container} ${backgroundClass}`}>
				{ route.asPath !== '/confirmation' && route.asPath !== '/login' && route.asPath !== '/register' && route.asPath !== '/' &&
					<Header />
				}
				<main className={s.main}>{children}</main>
			</div>
		</>
	)
}
