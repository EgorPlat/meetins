import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { getUserData, setIsAsyncLoaded } from '../global/store/store'
import { useRouter } from 'next/router'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'



function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();
	const [connection, setConnection] = useState<HubConnection>();

	useEffect(() => {
		if(localStorage.getItem('access-token')) {
			setIsAsyncLoaded(false);
			getUserData().then( (res) => {
				if(res.status === 200) {  
					setIsAsyncLoaded(true);
					router.push(localStorage.getItem('previousPage')!); 
				}
			}) 
		} else {
			router.push('/login');
		}
		const newConnection = new HubConnectionBuilder()
		.withUrl('https://api.meetins.ru/messenger')
		.withAutomaticReconnect()
		.build()
		setConnection(() => newConnection);
	}, [])

	useEffect(() => {
		if(connection) {
			connection.start().then(result => {
				console.log('Connected!');

				connection.on('ReceiveBroadcast', message => {
					console.log(message);
				});
			})
			.catch(e => console.log('Connection failed: ', e));
		}
	}, [connection])
	
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
