"use client";
import { useForm } from "react-hook-form"
import { JSX, useState } from "react"
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import Image from "next/image"
import femaleIcon from "../../../public/images/female.svg"
import maleIcon from "../../../public/images/male.svg"
import s from "./page.module.scss";
import logo from "../../../public/images/logo.svg";
import Head from "next/head"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import Link from "next/link"
import { FaCity, FaEnvelope, FaLock, FaQuestion, FaUser } from "react-icons/fa6"
import { isEmail, validateEmailOrPhone } from "@/shared/helpers/validate";
import { addNotification } from "@/global/store/notifications_model";
import { sendRegData, setEmailForConfirmation, setRegisterDetails } from "@/global/store/register_model";
import Input from "@/shared/ui/Input/Input";
import CustomButtonWithHint from "@/shared/ui/CustomButtonWithHint/CustomButtonWithHint";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";

export default function Register(): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const [gender, setGender] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const { t } = useTranslation();

    const sendLoginData = (data: {
		name: string
		email: string | null
		password: string
		gender: string
		city: string
	} | any) => {
        const email = isEmail(data.email);
        const nameArr = data.name.split(" ")
		
        const passwordWOSpace = data.password.split("").filter(e => e !== " ").join("");
        if (passwordWOSpace.length !== data.password.length) {
            addNotification({
                text: "В пароле нельзя использовать пробелы",
                type: "warning",
                textColor: "black",
                time: 3000
            });
            return;
        }
        setRegisterDetails({
            name: nameArr[0],
            email: email,
            password: passwordWOSpace,
            gender: data.gender,
            city: data.city
        })
        setIsLoading(true);
        sendRegData({
            name: nameArr[0],
            email: email,
            password: passwordWOSpace,
            gender: data.gender,
            city: data.city
        }).then( (res: any) => {
            setIsLoading(false);
            if(res.data?.statusCode <= 217) {
                setEmailForConfirmation(email);
                router.push("/auth/confirmation");
            }
        })
    }

    return (
        <div className={s.cardWrapper}>
            <div className={s.card}>
                <Head>
                    <title>Meetins-{t("Регистрация")}</title>
                    <meta name="description" content="Meetins - регистрация" key="desc" />
                    <meta property="og:title" content="Зарегестрируйтесь в Meetins и начните знакомится!" />
                    <meta
                        property="og:description"
                        content="Регистрируйтесь и общайтесь!"
                    />
                </Head>
                <h1 style={{ display: "grid", justifyItems: "center" }}>
                    <Image
                        width={75}
                        height={75}
                        alt="Logo"
                        src={logo}
                    />
                    {t("Регистрация")}
                </h1>
                <form autoComplete='off' onSubmit={handleSubmit(sendLoginData)}>
                    <Input
                        Icon={FaUser}
                        placeholder={t("Имя")}
                        type='text'
                        id='login'	
                        autocomplete={"off"}
                        className={errors.name && s.errorBorder}
                        register={register("name", {
                            required: true,
                            validate: (value) =>
                                /^[a-zа-яё]+$/i.test(value) === false
                                    ? "Пожалуйста следуйте формату: Имя"
                                    : true,
                        })}
                    />
                    {errors.name && (
                        <span className={s.errorSpan}>Следуйте формату Имя: </span>
                    )}
                    <Input
                        Icon={FaEnvelope}
                        placeholder={t("Email")}
                        type='text' 
                        id='phoneOrEmail'
                        style={{ marginTop: "25px" }}
                        className={errors.phone_or_email && s.errorBorder}
                        register={register("email", {
                            required: true,
                            validate: (value) => validateEmailOrPhone(value),
                        })}
                    >
                        <CustomButtonWithHint
                            bordered={false}
                            title={
                                <FaQuestion fontSize={16} color="black" />
                            }
                            hintTitle="Убедитесь, что Ваш почтовый ящик не полный и что он существует"
                            fontSize={14}
                        />
                    </Input>
                    {errors.email && (
                        <span className={s.errorSpan}>{t("Введите валидную почту")}</span>
                    )}
					
                    <Input
                        Icon={FaLock}
                        placeholder={t("Пароль")}
                        type={showPassword ? "text" : "password"}
                        id='pass'
                        autocomplete="on"
                        style={{ marginTop: "25px" }}
                        register={register("password", {
                            required: true,
                            validate: (value) =>
                                value.length >= 6 && value.length <= 12
                        })}>
                        {
                            showPassword 
                                ? <IoIosEye fontSize={20} color="black" onClick={() => setShowPassword(prev => !prev)} /> 
                                : <IoIosEyeOff fontSize={20} color="black" onClick={() => setShowPassword(prev => !prev)} />
                        }
                    </Input>
                    {errors.password && (
                        <span className={s.errorSpan}>{t("Введите пароль от 6 до 12 символов")}</span>
                    )}

                    <Input
                        Icon={FaCity}
                        placeholder={t("City")}
                        type='text' 
                        id='city'
                        style={{ marginTop: "25px" }}
                        className={errors.date && s.errorBorder}
                        register={register("city", {
                            required: true,
                        })}
                    />
                    {errors.city && (
                        <span className={s.errorSpan}>{t("Пожалуйста укажите город")}</span>
                    )}
                    <div className={s.gender}>
                        <span>Выберите пол:</span>
                        <label
                            onClick={() => setGender("male")}
                            className={gender === "male" ? `${s.checked}` : ""}
                            htmlFor='gender_male'>
                            <Image
                                src={maleIcon}
                                alt='male icon'
                                width={40}
                                height={40}
                            />
                        </label>
                        <input
                            {...register("gender", { required: true })}
                            id='gender_male'
                            value='male'
                            type='radio'
                        />
                        <label
                            onClick={() => setGender("female")}
                            className={gender === "female" ? `${s.checked}` : ""}
                            htmlFor='gender_female'>
                            <Image
                                src={femaleIcon}
                                alt='female icon'
                                width={40}
                                height={40}
                            />
                        </label>
                        <input
                            {...register("gender", { required: true })}
                            id='gender_female'
                            value='female'
                            type='radio'
                        />
                    </div>
                    {errors.gender && (
                        <span className={s.errorSpan}>{t("Пожалуйста укажите пол")}</span>
                    )}
                    <button type='submit' className={` btn ${s.submitBtn}`}>
                        {
                            isLoading ? <CustomLoader /> : t("Регистрация")
                        }
                    </button>
                    <div className={s.navActions}>
                        <Link href="/login">Уже есть аккаунт?</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
