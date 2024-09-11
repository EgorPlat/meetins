// eslint disable
import { useRouter } from "next/router";
import { $user, baseURL, isMobile, setCurrentPage } from "../../global/store/store";
import { useEffect } from "react";
import Header from "../Header";
import s from "./layout.module.scss";
import { useUnit } from "effector-react";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import CustomLoader from "../../shared/ui/CustomLoader/CustomLoader";
import MobileBottomMenu from "../MobileBottomMenu/MobileBottomMenu";

export default function Layout({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const isMobile$ = useUnit(isMobile);
    const authedUser$ = useUnit($user);
    const background = ["/login", "/register"].includes(router.asPath) ? s.loginPage : s.mainPage;
    const isNeededRouteToShowMenu =
        router.asPath !== "/confirmation"
            && router.asPath !== "/login"
            && router.asPath !== "/register"
            && router.asPath !== "/";

    useEffect(() => {
        if (router.asPath !== "/" && !router.asPath.includes("[")) {
            setCurrentPage(router.asPath);
            localStorage.setItem("previousPage", router.asPath);
        }
        document.getElementById("mobileMainContent")?.scrollTo(0, 0);
    }, [router.asPath]);
    
    if (isMobile$ === true) {
        return (
            <div 
                className={`${s.mobileContainer} ${!isNeededRouteToShowMenu ? background : s.mobileContainerGrid}`}
            >
                {
                    isNeededRouteToShowMenu ?
                        <>
                            <header>
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
                            <main id="mobileMainContent">{children}</main>
                            <footer>
                                <MobileBottomMenu authedUser={authedUser$} />
                            </footer>
                        </> :
                        <div className={s.main}>
                            {children}
                        </div>
                }
            </div> 
        )
    }
    else if (isMobile$ === false) {
        return (
            <div className={`${s.container} ${background}`}>
                {isNeededRouteToShowMenu && <Header />}
                {
                    <div className={s.main}>
                        {children}
                    </div>
                }
            </div>
        )
    } else {
        return <CustomLoader />
    }
}