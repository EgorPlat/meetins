import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { $scrollPageBlocked, getInitialUserDataAndCheckAuth, isInithialDataLoaded, isVideoCallOpened, setIsMobile } from "../global/store/store";
import { connection } from "../global/store/connection_model";
import { useUnit } from "effector-react";
import { detectUserLanguage } from "../shared/helpers/helper";
import { useResize } from "../shared/hooks/useResize";
import { setRouter } from "../global/store/router_model";
import { useRouter } from "next/router";
import { getMyDialogs } from "../global/store/chat_model";
import { useAuthAndInithialSocket } from "../shared/hooks/useAuthAndInithialSocket";
import { useTheme } from "../shared/hooks/useTheme";
import { useBlockBodyScroll } from "../shared/hooks/useBlockScroll";
import Head from "next/head";
import i18n from "../i18n";
import NotificationBlock from "../widgets/NotificationBlock/notificationBlock";
import Layout from "../widgets/Layout/Layout";
import VideoCallModal from "../widgets/VideoCallModal/VideoCallModal";
import "../i18n";
import "../styles/app.css";
import "../styles/themes.css";
import "regenerator-runtime/runtime";
import "../node_modules/reseter.css/css/reseter.min.css";
import CustomModal from "../shared/ui/CustomModal/CustomModal";
import { MusicControlBlock } from "../widgets/MusicControlBlock/musicControlBlock";
import { currentNotifications } from "../global/store/notifications_model";
import CustomLoader from "../shared/ui/CustomLoader/CustomLoader";

function MyApp({ Component, pageProps }: AppProps) {

    const connection$ = useUnit(connection);
    const isScrollPageBlocked = useUnit($scrollPageBlocked);
    const isVideoCallOpened$ = useUnit(isVideoCallOpened);
    const currentNotifications$ = useUnit(currentNotifications);
    const isInithialDataLoaded$ = useUnit(isInithialDataLoaded);

    const router = useRouter();
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

    if (!isInithialDataLoaded$) return <CustomLoader />
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
            { currentNotifications$.length !== 0 && <NotificationBlock /> }
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
                    Для дальнейшей работы c сайтом, убедитесь, что у Вас
                    разрешены для использования сторонние cookie файлы, иначе авторизоваться
                    на нашем сайте не получится.
                    Чтобы разрешить использование cookie, перейдите в настройки браузера, затем
                    найдите меню настройки сайтов или безопасности и конфиденциальности и включите
                    использование cookie.
                </p>
            </CustomModal>
        </Layout>
    )
}

export default MyApp;