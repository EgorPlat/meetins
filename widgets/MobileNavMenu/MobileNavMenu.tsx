import s from "./MobileNavMenu.module.scss";
import { MdExitToApp } from "react-icons/md";
import { useEffect, useState } from "react";
import LeftNavMenu from "../LeftNavMenu/LeftNavMenu";
import logo from "../../public/images/logo.svg";
import Image from "next/image";
import { $user, baseURL, setIsScrollPageBlocked } from "../../global/store/store";
import { handleLogOut } from "../../global/store/login_model";
import { AiOutlineMenu } from "react-icons/ai";
import { useUnit } from "effector-react";

export default function MobileNavMenu() {

    const [isOpened, setIsOpened] = useState<boolean>(false);
    const authedUser$ = useUnit($user);

    useEffect(() => {
        setIsScrollPageBlocked(isOpened);
    }, [isOpened]);

    const handleCloseMenu = () => {
        setIsOpened(false);
    };

    const handleLogOutClick = () => {
        setIsOpened(false);
        handleLogOut();
    };
    
    return (
        <div className={s.mobileMenu}>
            <AiOutlineMenu className={s.mobileMenuIcon} fontSize={22} onClick={() => setIsOpened(true)} />
            {
                isOpened &&
                <div className={s.mobileMenuWrapper} onClick={handleCloseMenu}>
                    <div className={s.mobileMenuWrapperShown} onClick={(e) => e.stopPropagation()}>
                        <div className={s.headerWrapper}>
                            <Image  
                                className={s.avatar}
                                src={baseURL + authedUser$.avatar}
                                width={55}
                                height={55}
                                alt='User avatar'
                            />
                            { authedUser$.name }
                        </div>
                        <div className={s.leftNavMenu} onClick={() => setIsOpened(false)}>
                            <LeftNavMenu />
                        </div>
                        <div className={s.exitIcon} onClick={handleLogOutClick}>
                            <span className={s.exitTitle}>Выход</span>
                            <MdExitToApp fontSize={36} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}