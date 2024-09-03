import s from "./MobileNavMenu.module.scss";
import { MdExitToApp } from "react-icons/md";
import { useEffect, useState } from "react";
import LeftNavMenu from "../LeftNavMenu/LeftNavMenu";
import logo from "../../public/images/logo.svg";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import { setIsScrollPageBlocked } from "../../global/store/store";
import { handleLogOut } from "../../global/store/login_model";

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
            <RxHamburgerMenu className={s.mobileMenuIcon} fontSize={36} onClick={() => setIsOpened(true)} />
            {
                isOpened &&
                <div className={s.mobileMenuWrapper} onClick={handleCloseMenu}>
                    <div className={s.mobileMenuWrapperShown} onClick={(e) => e.stopPropagation()}>
                        <div  className={s.logoImage}>
                            <Image
                                width={75}
                                height={75}
                                src={logo}
                                alt="company logo"
                            />
                        </div>
                        <LeftNavMenu />
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