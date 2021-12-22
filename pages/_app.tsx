import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { $user, getUserData, setUser, updateTokens } from '../global/store/store'


function MyApp({ Component, pageProps }: AppProps) {

	useEffect( () => {
		getUserData().then((res) => {
		    if(res.status === 200) {
				setUser(res.data);
			}
		})
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
