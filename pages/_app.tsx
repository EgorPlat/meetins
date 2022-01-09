import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { getUserData, setIsTokenUpdated } from '../global/store/store'
import { useRouter } from 'next/router'



function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();

	useEffect(() => {
		if(localStorage.getItem('access-token')) {
			setIsTokenUpdated(false);
			getUserData().then( (res) => {
				if(res.status === 200) {  
					setIsTokenUpdated(true);
					router.push(`/profile/${res.data?.loginUrl}`); 
				}
			})
		} else {
			router.push('/login');
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
