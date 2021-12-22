import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../styles/app.css'
import '../node_modules/reseter.css/css/reseter.min.css'
import Head from 'next/head'
import { useEffect } from 'react'
import { $currentPage, getUserData, setUser, updateTokens } from '../global/store/store'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'


function MyApp({ Component, pageProps }: AppProps) {

	const router = useRouter();
	const currentPage = useStore($currentPage);

	useEffect(() => {
		if(localStorage.getItem('access-token') !== "") {
			getUserData().then( (res) => {
				if(res.status === 200) { setUser(res.data); router.push(currentPage)}
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
