"use client";
import { useRouter } from "next/navigation"
import { JSX, Suspense } from "react";
import Image from "next/image"
import logo from "../../public/images/full-new-logo.svg";
import dynamic from "next/dynamic";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import s from "./header.module.scss"

const MainNavbar = dynamic(() => import("../MainNavbar"), { loading: () => <CustomLoader />, ssr: false });

export default function Header(): JSX.Element {
	
    const router = useRouter();

    return (   
        <div className={`${s.header}`}>
            <div className={s.logo}>
                <Image
                    onClick={() => router.push("/about")}
                    className={s.logoImage}
                    src={logo}
                    alt='company logo'
                    width={50}
                />
            </div>
            <Suspense fallback={<CustomLoader />}>
                <MainNavbar />
            </Suspense>
        </div>
    )
}
