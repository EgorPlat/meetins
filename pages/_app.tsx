import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { getInitialUserDataAndCheckAuth } from '../global/store/store'
import { useRouter } from 'next/router'
import { connection, setNewConnection } from '../global/store/connection_model'
import { setRouter } from '../global/store/router_model'
import { io } from 'socket.io-client'
import { useStore } from 'effector-react'

function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();
	const connection$ = useStore(connection);
 
	useEffect(() => {
		setRouter(router);
		getInitialUserDataAndCheckAuth();
		if(localStorage.getItem('access-token') !== '') {
			const newConnection = io('https://meetins.herokuapp.com', {
				extraHeaders: {
					Authorization: String(localStorage.getItem('access-token'))
				}
			});
		    setNewConnection(newConnection)
		} else {
			router.push('/login')
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
		</Layout>
	)
}

export default MyApp

