import { IoPeopleSharp } from "react-icons/io5";
import MobileNavMenu from "../MobileNavMenu/MobileNavMenu";
import s from "./MobileBottomMenu.module.scss";
import { MdSettings } from "react-icons/md";
import { useRouter } from "next/router";
import { User } from "../../entities";
import { GoPersonFill } from "react-icons/go";

interface IMobileBottomMenuProps {
    authedUser: User
}

export default function MobileBottomMenu({ authedUser }: IMobileBottomMenuProps) {

    const router = useRouter();

    return (
        <nav className={s.nav}>
            <div className={s.elem}>
                <MobileNavMenu />
                <div className={s.menuElem}>
                    <span>Меню</span>
                    <div className={s.round}></div>
                </div>
            </div>
            <div className={s.elem}>
                <IoPeopleSharp fontSize={22} onClick={() => router.push("/peoples")} />
                <span>Люди</span>
            </div>
            <div className={s.elem}>
                <GoPersonFill fontSize={22} onClick={() => router.push(`/profile/${authedUser?.login}`)} />
                <span>Профиль</span>
            </div>
            <div className={s.elem}>
                <MdSettings fontSize={22} onClick={() => router.push("/settings")} />
                <span>Настройки</span>
            </div>
        </nav>
    )
}