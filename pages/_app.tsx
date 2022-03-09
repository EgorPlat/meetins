import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { getUserData, setIsAsyncLoaded } from '../global/store/store'
import { useRouter } from 'next/router'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { connectionStart, setNewConnection } from '../global/store/connection_model'


function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();

	useEffect(() => {
		if(localStorage.getItem('access-token')) {
			setIsAsyncLoaded(false);
			getUserData().then( (res) => {
				if(res.status === 200) {  
					setIsAsyncLoaded(true);
					router.push(localStorage.getItem('previousPage')!);
				} else {
					localStorage.clear();
					router.push('/login');
				}
			}) 
		} else {
			router.push('/login');
		}
		const newConnection = new HubConnectionBuilder()
		.withUrl('https://api.meetins.ru/messenger', { accessTokenFactory: () => String(localStorage.getItem('access-token')) })
		.withAutomaticReconnect()
		.build()
		setNewConnection(newConnection);
		connectionStart(newConnection);	
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
