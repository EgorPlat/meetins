import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useCallback, useEffect } from 'react'
import { getUserData, setIsAsyncLoaded } from '../global/store/store'
import { useRouter } from 'next/router'
import { useSignalr } from '@known-as-bmf/react-signalr'
import { signalrEndpoint } from '../global/store/signalConnect_model'



function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();
	const { send, on } = useSignalr(signalrEndpoint);

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
	}, [])
	useEffect(() => {
		const subConnection = on('myMethod').subscribe();
		return () => subConnection.unsubscribe();
	}, [on]);
	const notify = useCallback(() => {
		send('remoteMethod', { foo: 'bar' });
	}, []);
	
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
