import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { $scrollPageBlocked, getInitialUserDataAndCheckAuth, isVideoCallOpened, setIsMobile } from "../global/store/store";
import { connection } from "../global/store/connection_model";
import { useStore } from "effector-react";
import { detectUserLanguage } from "../global/helpers/helper";
import { useResize } from "../global/hooks/useResize";
import { setRouter } from "../global/store/router_model";
import { useRouter } from "next/router";
import { getMyDialogs } from "../global/store/chat_model";
import { MusicControlBlock } from "../global/components/MusicControlBlock/musicControlBlock";
import { useAuthAndInithialSocket } from "../global/hooks/useAuthAndInithialSocket";
import { useTheme } from "../global/hooks/useTheme";
import { useBlockBodyScroll } from "../global/hooks/useBlockScroll";
import Head from "next/head";
import i18n from "../i18n";
import NotificationBlock from "../global/components/NotificationBlock/notificationBlock";
import Layout from "../global/components/Layout/Layout";
import VideoCallModal from "../global/components/VideoCallModal/VideoCallModal";
import "../i18n";
import "../styles/app.css";
import "../styles/themes.css";
import "regenerator-runtime/runtime";
import "../node_modules/reseter.css/css/reseter.min.css";
import CustomModal from "../global/components-ui/CustomModal/CustomModal";

function MyApp({ Component, pageProps }: AppProps) {

    const connection$ = useStore(connection);
    const isScrollPageBlocked = useStore($scrollPageBlocked);

    const router = useRouter();
    const isVideoCallOpened$ = useStore(isVideoCallOpened);
    const { isMobile, isUnAdaptive } = useResize();
    const isCookieModalNeededToShow =
        router.asPath === "/login" ||
        router.asPath === "/register";
    const [isCookieModalOpened, setIsCookieModalOpened] = useState<boolean>(isCookieModalNeededToShow);

    useTheme();
    useAuthAndInithialSocket();
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
    }, [isMobile, isUnAdaptive]);

    return (
        <Layout>
            <Head>
                <title>Meetins</title>
                <link rel='icon' href='/images/logo.svg' />
                <meta name="description" content="Checkout our service" key="desc" />
                <meta property="og:title" content="Social Media Meetins for persons who want to find new relations with other peoples and go forward together." />
                <meta
                    property="og:description"
                    content="Join us and get a lot of fun and new friends."
                />
            </Head>
            <Component {...pageProps} />
            <NotificationBlock />
            <MusicControlBlock />
            <VideoCallModal isOpen={isVideoCallOpened$} />
            <CustomModal
                title="Настройка cookie-файлов"
                isDisplay={isCookieModalOpened}
                changeModal={setIsCookieModalOpened}
                actionConfirmed={(status) => setIsCookieModalOpened(!status)}
                typeOfActions="default"
            >
                <p>
                    Для дальнейшей работы с сайтом, убедитесь, что у Вас
                    разрешены для использования сторонние cookie файлы, иначе авторизоваться
                    на нашем сайте не получится.
                    <p>
                        Чтобы разрешить использование cookie, перейдите в настройки браузера, затем
                        найдите меню настройки сайтов или безопасности и конфиденциальности и включите
                        использование cookie.
                    </p>
                </p>
            </CustomModal>
        </Layout>
    )
}

export default MyApp;

