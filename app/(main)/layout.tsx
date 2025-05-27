import { ReactNode } from "react";
import { headers } from "next/headers";
import MobileBottomMenu from "@/widgets/MobileBottomMenu/MobileBottomMenu";
import dynamic from "next/dynamic";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import MobileHeader from "@/widgets/MobileHeader/MobileHeader";
import s from "./layout.module.scss";
import { isMobileDevice } from "@/shared/helpers/helper";


const Header = dynamic(() => import("@/widgets/Header"), { loading: () => <CustomLoader /> });
const LeftNavMenu = dynamic(() => import("@/widgets/LeftNavMenu/LeftNavMenu"), { loading: () => <CustomLoader /> });

interface IMainLayoutProps {
    children: ReactNode
}

export default async function MainLayout({ children }: IMainLayoutProps) {

    const awaitedHeaders = await headers();
    const isMobile$ = isMobileDevice(awaitedHeaders.get("user-agent") || "");

    if (!isMobile$) {
        return (
            <div className={s.mainLayout}>
                <Header />
                <div className={s.mainLayoutContentWrapper}>
                    <div className={s.mainLayoutLeftMenu}>
                        <LeftNavMenu />
                    </div>
                    <div className={s.mainLayoutContent}>
                        { children }
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={s.mainLayoutMobile}>
                <MobileHeader />
                <main className={s.mainLayoutMobileContent} id="mobileMainContent">{children}</main>
                <footer className={s.mainLayoutMobileFooter}>
                    <MobileBottomMenu />
                </footer>
            </div>
        )
    }
}