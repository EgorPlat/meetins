import { useRouter } from "next/router";
import { setCurrentPage } from "../../global/store/store";
import { useEffect } from "react";
import Header from "../Header";
import s from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {

    const route = useRouter();
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
    }, [route.asPath]);


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