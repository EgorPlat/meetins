import Head from "next/head";
import { useForm } from "react-hook-form";
import { isEmail } from "../../global/helpers/validate";
import { $loginLoading, sendLogData } from "../../global/store/login_model";
import { useState } from "react";
import { useStore } from "effector-react";
import { useTranslation } from "react-i18next";
import Input from "../../global/components-ui/Input/Input";
import Link from "next/link";
import logo from "../../public/images/logo.svg";
import Image from "next/image";
import CustomLoader from "../../global/components-ui/CustomLoader/CustomLoader";
import loginIcon from "../../public/images/login.svg";
import passIcon from "../../public/images/pass.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "../../styles/pageStyles/auth.module.scss";
import { addNotification } from "../../global/store/notifications_model";

export default function Login(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [errorMessage, setErrorMessage] = useState<string>("");
    const loginLoading = useStore($loginLoading);
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
    }
    return (
        <div className={s.cardWrapper}>
            <div className={s.card}>
                <Head>
                    <title>{t("Вход")}</title>
                    <meta name="keywords" content="meetins, meetin-s, Meetins, Meetin-s, знакомства, meetings, meet" />
                </Head>
                <h1 style={{ display: "grid" }}>
                    <Image
                        src={logo}
                    />
                    {t("Вход")}
                </h1>
                <form onSubmit={handleSubmit(sendLoginData)}>
                    <Input
                        icon={loginIcon}
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
                        icon={passIcon}
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
                    {errorMessage !== "" ?
                        <div className={`row ${s.errorBlock}`}>
                            {t("Вы ввели неверные данные. Пожалуйста проверьте правильность и попробуйте снова")}
                        </div> : null}
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
