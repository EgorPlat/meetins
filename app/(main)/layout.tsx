"use client";
import { ReactNode } from "react";
import { useUnit } from "effector-react";
import { $user, baseURL, isMobile } from "@/global/store/store";
import { useRouter } from "next/navigation";
import MobileBottomMenu from "@/widgets/MobileBottomMenu/MobileBottomMenu";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import dynamic from "next/dynamic";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import s from "./layout.module.scss";

const Header = dynamic(() => import("@/widgets/Header"), { ssr: false, loading: () => <CustomLoader /> });
const LeftNavMenu = dynamic(() => import("@/widgets/LeftNavMenu/LeftNavMenu"), { ssr: false, loading: () => <CustomLoader /> });

interface IMainLayoutProps {
    children: ReactNode
}

export default function MainLayout({ children }: IMainLayoutProps) {

    const isMobile$ = useUnit(isMobile);
    const router = useRouter();
    const authedUser$ = useUnit($user);
    
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
                <header className={s.mainLayoutMobileHeader}>
                    <Image 
                        width={40} 
                        height={40} 
                        src={logo} 
                        alt="Логотип"
                        onClick={() => router.push("/about")}
                    />
                    <div className={s.title}>Meetins</div>
                    <Image 
                        className={s.avatar} 
                        width={40} 
                        height={40} 
                        src={baseURL + authedUser$?.avatar} 
                        alt="Аватар"
                        onClick={() => router.push(`/profile/${authedUser$?.login}`)}
                    />
                </header>
                <main className={s.mainLayoutMobileContent} id="mobileMainContent">{children}</main>
                <footer className={s.mainLayoutMobileFooter}>
                    <MobileBottomMenu authedUser={authedUser$} />
                </footer>
            </div>
        )
    }
}