import Link from 'next/link';
import s from './MobileNavMenu.module.scss';
import { MdExitToApp, MdOutlineReadMore } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { setIsScrollPageBlocked } from '../../store/store';
import LeftNavMenu from '../LeftNavMenu/LeftNavMenu';
import logo from '../../../public/images/logo.svg'
import Image from 'next/image';
import { handleLogOut } from '../../store/login_model';

export default function MobileNavMenu() {

    const [isOpened, setIsOpened] = useState<boolean>(false);

    useEffect(() => {
        setIsScrollPageBlocked(isOpened);
    }, [isOpened]);

    const handleCloseMenu = () => {
        setIsOpened(false);
    };

    const handleLogOutClick = () => {
        handleLogOut()
    }
    return (
        <div className={s.mobileMenu}>
            <MdOutlineReadMore className={s.mobileMenuIcon} fontSize={42} onClick={() => setIsOpened(true)} />
            {
                isOpened &&
                <div className={s.mobileMenuWrapper} onClick={handleCloseMenu}>
                    <div className={s.mobileMenuWrapperShown} onClick={(e) => e.stopPropagation()}>
                        <Image  
                            className={s.logoImage}
                            src={logo}
                            alt='company logo'
                        />
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