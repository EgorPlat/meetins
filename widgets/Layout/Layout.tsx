// eslint disable
import { useRouter } from "next/router";
import { $user, baseURL, isMobile, setCurrentPage } from "../../global/store/store";
import { useEffect } from "react";
import Header from "../Header";
import s from "./layout.module.scss";
import { useUnit } from "effector-react";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import { GoPersonFill } from "react-icons/go";
import { MdSettings } from "react-icons/md";
import MobileNavMenu from "../MobileNavMenu/MobileNavMenu";
import { IoPeopleSharp } from "react-icons/io5";

export default function Layout({ children }: { children: React.ReactNode }) {

    const route = useRouter();
    const isMobile$ = useUnit(isMobile);
    const authedUser$ = useUnit($user);
    const background = ["/login", "/register"].includes(route.asPath) ? s.loginPage : s.mainPage;
    const isNeededRouteToShowMenu =
		route.asPath !== "/confirmation"
		&& route.asPath !== "/login"
		&& route.asPath !== "/register"
		&& route.asPath !== "/";

    useEffect(() => {
        if (route.asPath !== "/" && !route.asPath.includes("[")) {
            setCurrentPage(route.asPath);
            localStorage.setItem("previousPage", route.asPath);
        }
        document.getElementById("mobileMainContent")?.scrollTo(0, 0);
    }, [route.asPath]);


    if (isMobile$) {
        return (
            <div 
                className={`${s.mobileContainer} ${!isNeededRouteToShowMenu ? background : s.mobileContainerGrid}`}
            >
                {
                    isNeededRouteToShowMenu ?
                        <>
                            <header>
                                <Image width={40} height={40} src={logo} alt="Логотип" />
                                <div className={s.title}>Meetins</div>
                                <Image className={s.avatar} width={40} height={40} src={baseURL + authedUser$?.avatar} alt="Аватар" />
                            </header>
                            <main id="mobileMainContent">{children}</main>
                            <footer>
                                <nav className={s.nav}>
                                    <div className={s.elem}>
                                        <MobileNavMenu />
                                        <p>Меню</p>
                                    </div>
                                    <div className={s.elem}>
                                        <IoPeopleSharp fontSize={28} onClick={() => route.push("/peoples")} />
                                        <p>Люди</p>
                                    </div>
                                    <div className={s.elem}>
                                        <GoPersonFill fontSize={28} onClick={() => route.push(`/profile/${authedUser$?.login}`)} />
                                        <p>Профиль</p>
                                    </div>
                                    <div className={s.elem}>
                                        <MdSettings fontSize={28} onClick={() => route.push("/settings")} />
                                        <p>Настройки</p>
                                    </div>
                                </nav>
                            </footer>
                        </> :
                        <div className={s.main}>
                            {children}
                        </div>
                }
            </div> 
        )
    }
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
}