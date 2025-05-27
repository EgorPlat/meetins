"use client";
import { $user, baseURL } from "@/global/store/store";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import logo from "../../public/images/logo.svg";
import Image from "next/image";
import s from "./MobileHeader.module.scss";

export default function MobileHeader() {

    const router = useRouter();
    const authedUser$ = useUnit($user);

    return (
        <header className={s.mainLayoutMobileHeader}>
            <Image 
                width={40} 
                height={40} 
                src={logo} 
                alt="Логотип"
                onClick={() => router.push("/about")}
            />
            <div className={s.title}>Meetins</div>
            <Image 
                className={s.avatar} 
                width={40} 
                height={40} 
                src={baseURL + authedUser$?.avatar} 
                alt="Аватар"
                onClick={() => router.push(`/profile/${authedUser$?.login}`)}
            />
        </header>
    )
}