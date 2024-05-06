import s from './layout.module.scss'
import { useRouter } from 'next/dist/client/router'
import { $currentPage, setCurrentPage } from '../../../global/store/store'
import { useStore } from 'effector-react'
import { useEffect } from 'react'
import Header from '../Header'

export default function Layout({ children }: { children: React.ReactNode }) {

	const route = useRouter();

	const currentPage = useStore($currentPage)
	const background = ['/login', '/register'].includes(currentPage) ? s.loginPage : s.mainPage;
	const isNeededRouteToShowMenu = 
		route.asPath !== '/confirmation' 
		&& route.asPath !== '/login' 
		&& route.asPath !== '/register' 
		&& route.asPath !== '/';

	useEffect(() => {
		if(route.asPath !== '/' && !route.asPath.includes("[")) {
			setCurrentPage(route.asPath);
			localStorage.setItem('previousPage', route.asPath);
		}
	}, [route.asPath]);

	
	return ( 
		<>
			<div className={`${s.container} ${background}`}>
				{ isNeededRouteToShowMenu  && <Header /> }
				{ 	
					<div className={s.main}>
						{children}
					</div>
				}
			</div>
		</>
	)
}