import { useForm } from "react-hook-form";
import { isEmail } from "../../shared/helpers/validate";
import { $loginLoading, sendLogData } from "../../global/store/login_model";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { addNotification } from "../../global/store/notifications_model";
import Head from "next/head";
import Input from "../../shared/ui/Input/Input";
import Link from "next/link";
import logo from "../../public/images/logo.svg";
import Image from "next/image";
import CustomLoader from "../../shared/ui/CustomLoader/CustomLoader";
import s from "../../styles/pageStyles/auth.module.scss";
import { FaUnlock, FaUser } from "react-icons/fa6";

export default function Login(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const loginLoading = useUnit($loginLoading);
    const { t } = useTranslation();

    const sendLoginData = (data: { login: string, password: string }) => {
        const login = data.login;
        const pass = data.password;
        const passwordWOSpace = pass.split("").filter(e => e !== " ").join("");
        if (passwordWOSpace.length !== pass.length) {
            addNotification({
                text: "В пароле нельзя использовать пробелы",
                type: "warning",
                textColor: "black",
                time: 3000
            });
            return;
        }
        sendLogData({
            email: login,
            password: pass,
        });
    };

    return (
        <div className={s.cardWrapper}>
            <div className={s.card}>
                <Head>
                    <title>{t("Вход")}</title>
                    <meta name="keywords" content="meetins, meetin-s, Meetins, Meetin-s, знакомства, meetings, meet" />
                </Head>
                <h1 style={{ display: "grid" }}>
                    <Image
                        width={80}
                        height={80}
                        alt="Логотип"
                        src={logo}
                    />
                    {t("Вход")}
                </h1>
                <form onSubmit={handleSubmit(sendLoginData)}>
                    <Input
                        Icon={FaUser}
                        placeholder={t("Логин")}
                        type='text'
                        id='login'
                        style={{ marginTop: "22px" }}
                        register={register("login", {
                            required: true,
                            validate: (value) =>
                                isEmail(value) === value
                        })}
                    />
                    {errors.login && <span className={s.errorSpan}>{t("Введите корректный e-mail в формате *@gmail.com")}</span>}
                    <Input
                        Icon={FaUnlock}
                        placeholder={t("Пароль")}
                        type='password'
                        id='pass'
                        style={{ marginTop: "25px" }}
                        register={register("password", {
                            required: true,
                            validate: (value) =>
                                value.length >= 6 && value.length <= 12
                        })}
                    />
                    {errors.password && <span className={s.errorSpan}>{t("Не менее 6-ти символов, не более 12-ти символов")}</span>}
                    <button type='submit' className={`${s.submitBtn} btn`} >
                        {
                            loginLoading ? <CustomLoader /> : t("Войти")
                        }
                    </button>
                    <div className={s.navActions}>
                        <Link href="/register">Еще не зарегистрированы?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
