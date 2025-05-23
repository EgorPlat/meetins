import s from "./layout.module.scss";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={s.auth}>
            { children }
        </div>
    );
}
