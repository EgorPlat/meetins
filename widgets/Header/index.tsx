import s from "./header.module.scss"
import Image from "next/image"
import logo from "../../public/images/full-new-logo.svg";
import MainNavbar from "../MainNavbar"
import { useUnit } from "effector-react"
import { useRouter } from "next/router"
import "bootstrap/dist/css/bootstrap.min.css";
import { $currentPage } from "../../global/store/store"

export default function Header(): JSX.Element {
	
    const currentPage = useUnit($currentPage);
    const router = useRouter();
	
    let headerBgClass
    if (currentPage === "/") {
        headerBgClass = s.headerMainPage
    } else if (currentPage === "/login" || currentPage === "/register") {
        headerBgClass = s.headerAuthPage
    } else if (currentPage === "/profile") {
        headerBgClass = s.headerProfilePage
    }

    return (   
        <div className={`${s.header} ${headerBgClass}`}>
            <div className={s.logo}>
                <Image
                    onClick={() => router.push("/about")}
                    className={s.logoImage}
                    src={logo}
                    alt='company logo'
                    width={190}
                />
            </div>
            <MainNavbar />
        </div>
    )
}
