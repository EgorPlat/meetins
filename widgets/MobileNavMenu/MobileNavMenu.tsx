import s from "./MobileNavMenu.module.scss";
import { MdExitToApp } from "react-icons/md";
import { useEffect, useState } from "react";
import LeftNavMenu from "../LeftNavMenu/LeftNavMenu";
import logo from "../../public/images/logo.svg";
import Image from "next/image";
import { setIsScrollPageBlocked } from "../../global/store/store";
import { handleLogOut } from "../../global/store/login_model";
import { AiOutlineMenu } from "react-icons/ai";

export default function MobileNavMenu() {

    const [isOpened, setIsOpened] = useState<boolean>(false);

    useEffect(() => {
        setIsScrollPageBlocked(isOpened);
    }, [isOpened]);

    const handleCloseMenu = () => {
        setIsOpened(false);
    };

    const handleLogOutClick = () => {
        handleLogOut();
    };
    
    return (
        <div className={s.mobileMenu}>
            <AiOutlineMenu className={s.mobileMenuIcon} fontSize={28} onClick={() => setIsOpened(true)} />
            {
                isOpened &&
                <div className={s.mobileMenuWrapper} onClick={handleCloseMenu}>
                    <div className={s.mobileMenuWrapperShown} onClick={(e) => e.stopPropagation()}>
                        <Image  
                            className={s.logoImage}
                            src={logo}
                            width={60}
                            height={60}
                            alt='company logo'
                        />
                        <div onClick={() => setIsOpened(false)}>
                            <LeftNavMenu />
                        </div>
                        <div className={s.exitIcon} onClick={handleLogOutClick}>
                            <span className={s.exitTitle}>Выход</span>
                            <MdExitToApp fontSize={40} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}