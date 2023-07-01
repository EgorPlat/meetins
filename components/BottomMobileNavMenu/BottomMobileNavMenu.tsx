import { useStore } from "effector-react";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { countUreadMessages } from "../../global/store/chat_model";
import { $currentPage, $user } from "../../global/store/store";
import s from "./BottomMobileNavMenu.module.scss";
import Image from 'next/image';
import { useRouter } from "next/router";

export default function BottomMobileNavMenu(): JSX.Element {

    const { t } = useTranslation();
    const router = useRouter();
    const authedUser$ = useStore($user);

    const handleMenuClick = (path: string) => {
        router.push(path);
    };

    return(
        <div className={s.nav}>        
            <Image 
                src='/images/marks.png' 
                width="60px" 
                height="60px" 
                alt='test' 
                onClick={() => handleMenuClick('/marks')}
            />
            <Image 
                src='/images/invites.png' 
                width="60px" 
                height="60px" 
                alt='test' 
                onClick={() => handleMenuClick('/invites')}
            />
            <Image 
                src='/images/messanger.png' 
                width="60px" 
                height="60px" 
                alt='test' 
                onClick={() => handleMenuClick('/messanger')}
            />
            <Image 
                src='/images/event.png' 
                width="60px" 
                height="60px" 
                alt='test' 
                onClick={() => handleMenuClick('/events')}
            />
            <Image 
                src='/images/settings.png' 
                width="60px" 
                height="60px" 
                alt='test' 
                onClick={() => handleMenuClick('/settings')}
            />
            <Image 
                src='/images/peoples.png' 
                width="60px" 
                height="60px" 
                alt='test' 
                onClick={() => handleMenuClick('/peoples')}
            />
            <Image 
                src='/images/profile.png' 
                width="60px" 
                height="60px" 
                alt='test' 
                onClick={() => handleMenuClick(`/profile/${authedUser$.login}`)}
            />
        </div> 
    )
}