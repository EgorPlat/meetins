import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { $scrollPageBlocked, getInitialUserDataAndCheckAuth, setIsMobile } from '../global/store/store';
import { connection } from '../global/store/connection_model';
import { useStore } from 'effector-react';
import { detectUserLanguage } from '../global/helpers/helper';
import { useResize } from '../global/hooks/useResize';
import { setRouter } from '../global/store/router_model';
import { useRouter } from 'next/router';
import { getMyDialogs } from '../global/store/chat_model';
import { MusicControlBlock } from '../global/components/MusicControlBlock/musicControlBlock';
import { useAuthAndInithialSocket } from '../global/hooks/useAuthAndInithialSocket';
import { useTheme } from '../global/hooks/useTheme';
import { useBlockBodyScroll } from '../global/hooks/useBlockScroll';
import Head from 'next/head';
import i18n from '../i18n';
import NotificationBlock from '../global/components/NotificationBlock/notificationBlock';
import Layout from '../global/components/Layout/Layout';
import '../i18n';
import '../styles/app.css';
import '../styles/themes.css';
import 'regenerator-runtime/runtime';
import '../node_modules/reseter.css/css/reseter.min.css';

function MyApp({ Component, pageProps }: AppProps) {

	const connection$ = useStore(connection);
	const isScrollPageBlocked = useStore($scrollPageBlocked)

	const [isNotifyAdaptive, setIsNotifyAdaptive] = useState<boolean>();
	const router = useRouter();
	const {isMobile, isUnAdaptive} = useResize();
	const currentTheme = useTheme();
	const isConnected = useAuthAndInithialSocket();
	
	useBlockBodyScroll(isScrollPageBlocked);

	useEffect(() => {
		setRouter(router);
		getMyDialogs(true);
		getInitialUserDataAndCheckAuth();
		i18n.changeLanguage(detectUserLanguage());
		return () => {
			connection$?.disconnect();
		}
	}, []);

	useEffect(() => {
		setIsMobile(isMobile);
		setIsNotifyAdaptive(isUnAdaptive);
	}, [isMobile, isUnAdaptive]);
	
	return (
		<Layout>
			<Head>
				<title>Meetins</title>
				<link rel='icon' href='/images/logo.svg' />
				<meta name="description" content="Checkout our service" key="desc" />
				<meta property="og:title" content="Social Media Meetins for cool persons" />
				<meta
				property="og:description"
				content="Join us and get a lot of fun and new friends"
				/>
			</Head>
			{  <Component {...pageProps} />  }
			<NotificationBlock />
			<MusicControlBlock />
		</Layout>
	)
}

export default MyApp;

