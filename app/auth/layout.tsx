"use client";
import { usePathname } from "next/navigation";
import s from "./layout.module.scss";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathName = usePathname();
    const bgImage = ["/auth/login", "/auth/register"].find(el => el === pathName)
        ? s.authBg
        : s.defaultAuthBg;

    return (
        <div className={`${s.auth} ${bgImage}`}>
            { children }
        </div>
    );
}
