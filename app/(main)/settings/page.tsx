"use client";
import { useUnit } from "effector-react";
import { JSX, useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoQuestion } from "react-icons/go";
import { $user, isUserLoaded, setUser } from "@/global/store/store";
import { setIsAccountUpdated, setIsProfileUpdated, updateUserFilterStatus } from "@/global/store/settings_model";
import { User } from "@/entities";
import React from "react";
import ru from "../../../public/images/ru.png";
import us from "../../../public/images/us.png";
import Image from "next/image";
import s from "./settings.module.scss";
import CustomModal from "@/shared/ui/CustomModal/CustomModal";
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import ManageAccountForm from "@/features/forms/ManageAccount/Index";
import ProfileInfoForm from "@/features/forms/ProfileInfo/Index";
import CustomButtonWithHint from "@/shared/ui/CustomButtonWithHint/CustomButtonWithHint";
import TurnOffOn from "@/shared/ui/TurnOffOn/TurnOffOn";

export default function Settings(): JSX.Element {

    const isLoad = useUnit(isUserLoaded);
    const [isModal, setIsModal] = useState<boolean>(false);
    const { t, i18n } = useTranslation();
    const user$ = useUnit($user);

    useEffect(() => {
        return () => {
            setIsAccountUpdated(null);
            setIsProfileUpdated(null);
        }
    }, [])

    const changeModal = (status: boolean) => {
        setIsModal(() => status);
    };

    const handleChangeLocale = (local: string) => {
        i18n.changeLanguage(local);
    };

    const handleChangeStatus = (status: boolean) => {
        updateUserFilterStatus(status).then((res: User) => {
            if (res) {
                setUser(res);
            }
        })
    };

    const deleteAccount = () => {
        setIsModal(() => false);
    };

    const handleSwipeTheme = (theme: string) => {
        localStorage.setItem("data-theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    };

    return (
        <div className={`${s.settings}`}>
            <div className={`${s.formAndInfo}`}>
                <div className={s.filters}>
                    <div className={s.title}>
                        {t("Управление фильтрами контента")}
                        <CustomButtonWithHint
                            bordered={false}
                            fontSize={14}
                            title={<GoQuestion fontSize={20} />}
                            hintTitle={
                                "Фильтры контента - это функция, которая дает Вам возможность активировать алгоритм подбора контента на сайте (сообщества, люди, встречи, лента и т.д.) исходя из Ваших настроек профиля (например интересов, закладок, активности). Включая данную функцию важно понимать что количество контента на сайте может уменьшиться, при этом вероятность того что Вам попадется что-то не нужное или Вам не интерсное крайне мала"
                            }
                        />
                    </div>
                    <div className={s.filter}>
                        <TurnOffOn
                            inithialStatus={Boolean(user$?.isFilter)}
                            onChange={handleChangeStatus}
                        />
                    </div>
                </div>
                <div className={s.locale}>
                    <div className={s.title}>
                        {t("Выбрать язык")}
                        <CustomButtonWithHint
                            bordered={false}
                            fontSize={14}
                            title={<GoQuestion fontSize={20} />}
                            hintTitle={
                                "Пожалуйста, учитывайте, что при выборе языка, переводится только стандартная часть сайта (подсказки, навигационные меню, заголовки и т.п.). Это значит, что контентная часть страниц, созданная другими пользователями (новости, посты, комментарии и т.п.) переведена не будет."
                            }
                        />
                    </div>
                    <div className={s.locales}>
                        <div className={s.localeImg}>
                            <Image src={us} quality={100} width="70" height="50" alt="English" onClick={() => handleChangeLocale("en")} />
                        </div>
                        <div className={s.localeImg}>
                            <Image src={ru} quality={100} width="70" height="50" alt="Russian" onClick={() => handleChangeLocale("ru")} />
                        </div>
                    </div>
                </div>
                <div className={s.themes}>
                    <div className={s.title}>{t("Темы")}</div>
                    <button className={s.swipeTheme} onClick={() => handleSwipeTheme("black")}>
                        {t("Тёмная")}
                    </button>
                    <button className={s.swipeTheme} onClick={() => handleSwipeTheme("white")}>
                        {t("Светлая")}
                    </button>
                </div>
                <div className={s.info}>
                    <div className={s.title}>{t("Информация профиля")}</div>
                    {isLoad ? <div className={s.profileForm}>
                        <ProfileInfoForm />
                    </div> : <CustomLoader />}
                </div>
                <div className={s.management}>
                    <div className={s.title}>{t("Управление аккаунтом")}</div>
                    <div className={s.manageAcc}>
                        {isLoad ? <div className={s.accountForm}>
                            <ManageAccountForm />
                        </div> : <CustomLoader />}
                    </div>
                    <div className={s.infoText}>
                        <div className={s.title}>{t("Удаление аккаунта")}</div>
                        <div className={s.description}>
                            {t("Вы можете изменить адрес аккаунта на более привлекательный")}.<br />
                            {t("Другие пользователи смогут найти Вас по адресу")} <b>https://meetins-seven.vercel.app/{t("адрес")}</b><br />
                            {t("Вы можете удалить свой аккаунт, тогда другие пользователи больше не смогут")}<br />
                            {t("Вас найти на нашем сайте")}.
                            <div className={s.actions}>
                                <CustomButton text={t("Удалить аккаунт")} onClick={() => changeModal(true)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomModal
                title="Удаление аккаунта"
                isDisplay={isModal}
                changeModal={changeModal}
                actionConfirmed={deleteAccount}
                typeOfActions="default"
            >
                <div className={s.confirmDeletingContent}>{t("Подвердите действие - Удаление аккаунта")}.</div>
            </CustomModal>
        </div>
    )
}