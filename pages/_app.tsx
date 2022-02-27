import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { getUserData, setIsAsyncLoaded } from '../global/store/store'
import { useRouter } from 'next/router'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { connection, setNewConnection } from '../global/store/connection_model'
import { useStore } from 'effector-react'



function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();
	const connection$ = useStore(connection);

	useEffect(() => {
		if(localStorage.getItem('access-token')) {
			setIsAsyncLoaded(false);
			getUserData().then( (res) => {
				if(res.status === 200) {  
					setIsAsyncLoaded(true);
					router.push(localStorage.getItem('previousPage')!); 
				} else {
					router.push('/login');
				}
			}) 
		} else {
			router.push('/login');
		}
		const newConnection = new HubConnectionBuilder()
		.withUrl('https://api.meetins.ru/messenger')
		.withAutomaticReconnect()
		.build()
		setNewConnection(newConnection);		
	}, [])

	useEffect(() => {
		if(connection$ && localStorage.getItem('access-token') !== "") {
			connection$.start().then(result => {
				console.log('Connected!');

				connection$.on('ReceiveBroadcast', message => {
					console.log(message);
				});
			})
			.catch(e => console.log('Connection failed: ', e));
		}
	}, [connection$])
	
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
