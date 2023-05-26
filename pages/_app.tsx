import 'regenerator-runtime/runtime';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { setIsMobile } from '../global/store/store';
import { connection, setNewConnection } from '../global/store/connection_model';
import { useStore } from 'effector-react';
import { getMyDialogs } from '../global/store/chat_model'
import { detectUserLanguage } from '../global/helpers/helper';
import { useWebSpeach } from '../global/hooks/useWebSpeach';
import { useResize } from '../global/hooks/useResize';
import { useAuthAndInithialSocket } from '../global/hooks/useAuthAndInithialSocket';
import Layout from '../components/layout/Layout';
import '../styles/app.css';
import '../node_modules/reseter.css/css/reseter.min.css';
import Head from 'next/head';
import ErrorBlock from '../components/ErrorBlock/errorBlock';
import '../i18n';
import i18n from '../i18n';

function MyApp({ Component, pageProps }: AppProps) {

	const connection$ = useStore(connection);
	const isMobile = useResize();
	const newConnection = useAuthAndInithialSocket();
	//const speachDetecting = useWebSpeach();

	useEffect(() => {
		i18n.changeLanguage(detectUserLanguage());
		return () => {
			connection$?.disconnect();
		}
	}, []);

	useEffect(() => {
		if(newConnection) {
			setNewConnection(newConnection);
			getMyDialogs(true);
		}
	}, [newConnection]);

	useEffect(() => {
		setIsMobile(isMobile);
	}, [isMobile]);

	return (
		<Layout>
			<Head>
				<title>Meetins</title>
				<link rel='icon' href='/favicon.svg' />
			</Head>
			<Component {...pageProps} />
			<ErrorBlock />
		</Layout>
	)
}

export default MyApp;

