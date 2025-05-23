"use client";
import { useEffect } from "react";
import { $scrollPageBlocked, getInitialUserDataAndCheckAuth, isInithialDataLoaded, isVideoCallOpened, setIsMobile } from "@/global/store/store";
import { setRouter } from "@/global/store/router_model";
import { getMyDialogs } from "@/global/store/chat_model";
import { detectUserLanguage } from "@/shared/helpers/helper";
import { useUnit } from "effector-react";
import { usePathname, useRouter } from "next/navigation";
import { useResize } from "@/shared/hooks/useResize";
import { connection } from "@/global/store/connection_model";
import { currentNotifications } from "@/global/store/notifications_model";
import { useTheme } from "@/shared/hooks/useTheme";
import { useAuthAndInithialSocket } from "@/shared/hooks/useAuthAndInithialSocket";
import { useBlockBodyScroll } from "@/shared/hooks/useBlockScroll";
import { MusicControlBlock } from "@/widgets/MusicControlBlock/musicControlBlock";
import NotificationBlock from "@/widgets/NotificationBlock/notificationBlock";
import VideoCallModal from "@/widgets/VideoCallModal/VideoCallModal";
import i18n from "../i18n";
import "../styles/themes.css";
import "../node_modules/reseter.css/css/reseter.min.css";
import "../styles/global.scss";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const connection$ = useUnit(connection);
    const isScrollPageBlocked = useUnit($scrollPageBlocked);
    const isVideoCallOpened$ = useUnit(isVideoCallOpened);
    const currentNotifications$ = useUnit(currentNotifications);
    const isInithialDataLoaded$ = useUnit(isInithialDataLoaded);

    const pathName = usePathname();
    const router = useRouter();
    const { isMobile, isUnAdaptive } = useResize();
    
    useTheme();
    useAuthAndInithialSocket();
    useBlockBodyScroll(isScrollPageBlocked);

    useEffect(() => {
        getMyDialogs(true);
        getInitialUserDataAndCheckAuth();
        i18n.changeLanguage(detectUserLanguage());
        return () => {
            connection$?.disconnect();
        }
    }, []);
    
    useEffect(() => {
        setRouter({ ...router, asPath: pathName });
        localStorage.setItem("previousPage", pathName);
    }, [pathName]);

    useEffect(() => {
        setIsMobile(isMobile);
    }, [isMobile, isUnAdaptive]);

    return (
        <html lang="en">
            <body>
                {children}
                { currentNotifications$.length !== 0 && <NotificationBlock /> }
                <MusicControlBlock />
                <VideoCallModal isOpen={isVideoCallOpened$} />
            </body>
        </html>
    );
}
