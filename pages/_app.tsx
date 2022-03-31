import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { getInitialUserDataAndCheckAuth } from '../global/store/store'
import { useRouter } from 'next/router'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { connectionStart, setNewConnection } from '../global/store/connection_model'
import { setRouter } from '../global/store/router_model'


function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();
	
	useEffect(() => {
		setRouter(router);
		getInitialUserDataAndCheckAuth();
		//const newConnection = new HubConnectionBuilder()
		//.withUrl('https://api.meetins.ru/messenger', { accessTokenFactory: () => String(localStorage.getItem('access-token')) })
		//.withAutomaticReconnect()
		//.build()
		//setNewConnection(newConnection);
		//connectionStart(newConnection);	
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

