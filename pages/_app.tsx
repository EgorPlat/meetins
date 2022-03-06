import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { getUserData, setIsAsyncLoaded } from '../global/store/store'
import { useRouter } from 'next/router'
import { HubConnectionBuilder } from '@microsoft/signalr'
import { connection, setNewConnection } from '../global/store/connection_model'
import { useStore } from 'effector-react'
import { activeChat, IMyActiveDialogMessage, setActiveChat } from '../global/store/chat_model'
import { IMessageNotify } from '../global/NotifyInterfaces/MessageNotify'



function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();
	const connection$ = useStore(connection);
	const activeChat$ = useStore(activeChat);
	const activeChatRef = useRef(activeChat$);

	useEffect(() => {
		activeChatRef.current = activeChat$;
	}, [activeChat$])

	useEffect(() => {
		if(connection$ && localStorage.getItem('access-token') !== "") {
			connection$.start().then(result => {
				console.log('Connected!');
				connection$.on('Notify', (message: IMyActiveDialogMessage) => {
					if(activeChatRef.current.dialogId === message.dialogId){
						setActiveChat({
							...activeChatRef.current, 
							messages: [...activeChatRef.current.messages, message],
							content: message.content
						})
					}
				});
			})
			.catch(e => console.log('Connection failed: ', e));
		}
	}, [connection$])
	
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
		.withUrl('https://api.meetins.ru/messenger', { accessTokenFactory: () => String(localStorage.getItem('access-token')) })
		.withAutomaticReconnect()
		.build()
		setNewConnection(newConnection);		
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
