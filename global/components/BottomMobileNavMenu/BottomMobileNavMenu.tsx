import { useStore } from "effector-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { $user } from "../../store/store";
import s from "./BottomMobileNavMenu.module.scss";
import { useRouter } from "next/router";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { CgMoreO } from "react-icons/cg";
import { BsPeople } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

export default function BottomMobileNavMenu(): JSX.Element {

    const { t } = useTranslation();
    const router = useRouter();
    const authedUser$ = useStore($user);

    const handleMenuClick = (path: string) => {
        router.push(path);
    };

    return(
        <div className={s.navMenuMobile}>
            <AiOutlineMenu
                color="gray"
                fontSize={34}
            />      
            <FiSettings
                color="gray"
                fontSize={34}
                onClick={() => handleMenuClick('/settings')}
            />
            <BsPeople
                color="gray"
                fontSize={34}
                onClick={() => handleMenuClick('/peoples')}
            />
            <CgMoreO 
                color="gray"
                fontSize={34}
            />
            <BiLogOut
                color="gray"
                fontSize={34}
            />
        </div> 
    )
}