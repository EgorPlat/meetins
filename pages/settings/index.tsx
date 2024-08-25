import { useStore } from "effector-react";
import { $user, isUserLoaded, setUser } from "../../global/store/store";
import { useEffect } from "react";
import { useState } from "react";
import { setIsAccountUpdated, setIsProfileUpdated, updateUserFilterStatus } from "../../global/store/settings_model";
import { useTranslation } from "react-i18next";
import { User } from "../../global/interfaces";
import React from "react";
import ProfileInfoForm from "../../global/forms/ProfileInfo/Index";
import ManageAccountForm from "../../global/forms/ManageAccount/Index";
import ru from "../../public/images/ru.png";
import us from "../../public/images/us.png";
import Image from "next/image";
import CustomLoader from "../../global/components-ui/CustomLoader/CustomLoader";
import TurnOffOn from "../../global/components-ui/TurnOffOn/TurnOffOn";
import ButtonWithHint from "../../global/components-ui/Hint/buttonWithHint";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import s from "./settings.module.scss";
import CustomModal from "../../global/components-ui/CustomModal/CustomModal";

export default function Settings(): JSX.Element {

    const isLoad = useStore(isUserLoaded);
    const [isModal, setIsModal] = useState<boolean>(false);
    const { t, i18n } = useTranslation();
    const user$ = useStore($user);

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

    const deleteAccount = (status: boolean) => {
        setIsModal(() => false);
    };

    const handleSwipeTheme = (theme: string) => {
        localStorage.setItem("data-theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    };

    return (
        <PageContainer>
            <div className={`${s.settings}`}>
                <div className={`${s.formAndInfo}`}>
                    <div className={s.filters}>
                        <h4>{t("Управление фильтрами контента")}</h4>
                        <div className={s.filter}>
                            <TurnOffOn
                                inithialStatus={user$?.isFilter}
                                onChange={handleChangeStatus}
                            />
                            <ButtonWithHint
                                fontSize={14}
                                title="?"
                                hintTitle={
                                    "Фильтры контента - это функция, которая дает Вам возможность активировать алгоритм подбора контента на сайте (сообщества, люди, встречи, лента и т.д.) исходя из Ваших настроек профиля (например интересов, закладок, активности). Включая данную функцию важно понимать что количество контента на сайте может уменьшиться, при этом вероятность того что Вам попадется что-то не нужное или Вам не интерсное крайне мала"
                                }
                            />
                        </div>
                    </div>
                    <div className={s.locale}>
                        <h4>{t("Выбрать язык")}</h4>
                        <div className={s.locales}>
                            <div className={s.localeImg}>
                                <Image src={us} width="62px" height="50px" onClick={() => handleChangeLocale("en")} />
                            </div>
                            <div className={s.localeImg}>
                                <Image src={ru} width="62px" height="50px" onClick={() => handleChangeLocale("ru")} />
                            </div>
                        </div>
                    </div>
                    <div className={s.themes}>
                        <h4>{t("Темы")}</h4>
                        <button className={s.swipeTheme} onClick={() => handleSwipeTheme("black")}>
                            {t("Черная")}
                        </button>
                        <button className={s.swipeTheme} onClick={() => handleSwipeTheme("white")}>
                            {t("Белая")}
                        </button>
                    </div>
                    <div className={s.info}>
                        <h4>{t("Информация профиля")}</h4>
                        {isLoad ? <div className={s.profileForm}>
                            <ProfileInfoForm />
                        </div> : <CustomLoader />}
                    </div>
                    <div className={s.management}>
                        <h4>{t("Управление аккаунтом")}</h4>
                        <div className={s.manageAcc}>
                            {isLoad ? <div className={s.accountForm}>
                                <ManageAccountForm />
                            </div> : <CustomLoader />}
                        </div>
                        <div className={`${s.infoText}`}>
                            <div className={`${s.description}`}>
                                {t("Вы можете изменить адрес аккаунта на более привлекательный")}.<br />
                                {t("Другие пользователи смогут найти Вас по адресу")} <b>meetins.ru/{t("адрес")}</b><br />
                                {t("Вы можете удалить свой аккаунт, тогда другие пользователи больше не смогут")}<br />
                                {t("Вас найти на нашем сайте")}.
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className={s.deleteBtn} onClick={() => changeModal(true)}>{t("Удалить аккаунт")}</button>
                    </div>
                </div>
                <CustomModal
                    title="Удаление аккаунта"
                    isDisplay={isModal}
                    changeModal={changeModal}
                    actionConfirmed={deleteAccount}
                    typeOfActions="default"
                >
                    <h6>{t("Подвердите действие - Удаление аккаунта")}.</h6>
                </CustomModal>
            </div>
        </PageContainer>
    )
}