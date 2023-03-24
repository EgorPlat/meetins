import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { baseURL, getInitialUserDataAndCheckAuth, setIsMobile } from '../global/store/store'
import { useRouter } from 'next/router'
import { connection, setNewConnection } from '../global/store/connection_model'
import { setRouter } from '../global/store/router_model'
import { io } from 'socket.io-client'
import { useStore } from 'effector-react'
import ErrorBlock from '../components/ErrorBlock/errorBlock'
import { getMyDialogs } from '../global/store/chat_model'
import '../i18n';
import { detectUserLanguage } from '../global/helpers/helper'
import i18n from '../i18n'

function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();
	const connection$ = useStore(connection);
 
	const handleResize = () => {
		if (window.innerWidth <= 810) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}

	useEffect(() => {
		i18n.changeLanguage(detectUserLanguage());
		setRouter(router);
		getInitialUserDataAndCheckAuth();
		if(localStorage.getItem('access-token') !== '') {
			const newConnection = io(baseURL, {
				extraHeaders: {
					Authorization: String(localStorage.getItem('access-token'))
				}
			});
		    setNewConnection(newConnection);
			handleResize();
		} else {
			if (router.asPath !== '/confirmation') {
				router.push('/register');
			}
		}
		return () => {
			connection$?.disconnect();
		}
	}, [])
	return (
		<Layout>
			<Head>
				<title>Meetins</title>
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<Component {...pageProps} />
			<ErrorBlock />
		</Layout>
	)
}

export default MyApp;

