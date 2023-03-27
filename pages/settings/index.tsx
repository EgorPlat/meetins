import React from "react";
import s from "./settings.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { useStore } from "effector-react";
import { isAsyncLoaded, setCurrentPage } from "../../global/store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "../../global/helpers/Modal/Modal";
import ProfileInfoForm from "../../global/Forms/ProfileInfo/Index";
import ManageAccountForm from "../../global/Forms/ManageAccount/Index";
import { useState } from "react";
import { deleteUserAccount, setIsAccountUpdated, setIsProfileUpdated } from "../../global/store/settings_model";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import ru from '../../public/images/ru.png';
import us from '../../public/images/us.png';
import Image from "next/image";

export default function Settings(): JSX.Element {

    const isLoad = useStore(isAsyncLoaded);
    const router = useRouter();
    const [isModal, setIsModal] = useState<boolean>(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        return () => {
            setIsAccountUpdated(null);
            setIsProfileUpdated(null);
        }
    }, [])

    const changeModal = (status: boolean) => {
        setIsModal(() => status);
    }
    const handleChangeLocale = (local: string) => {
        i18n.changeLanguage(local);
    }
    const deleteAccount = (status: boolean) => {
        deleteUserAccount().then((response) => {
            if(response.status === 200) {
                localStorage.removeItem('access-token');
                localStorage.removeItem('refrash-token');
                router.push('/login');
            }
        })
        setIsModal(() => false);
    }
    return(
        <div className={`${s.settings}`}>
            <div className={`${s.settingsMenus}`}>
                <div className={`${s.menu}`}>
                    <div><Link href = ''>{t("Аккаунт")}</Link></div>
                    <div><Link href = ''>{t("Подписка")}</Link></div>
                </div>
                <div className={`${s.formAndInfo}`}>
                    <div className={s.locale}>
                        <h4>{t("Выбрать язык")}</h4>
                        <div className={s.locales}>
                            <div className={s.localeImg}>
                                <Image src={us} width="62px" height="50px" onClick={() => handleChangeLocale('en')}/>
                            </div>
                            <div className={s.localeImg}>
                                <Image src={ru} width="62px" height="50px" onClick={() => handleChangeLocale('ru')}/>
                            </div>
                        </div>
                    </div>
                    <div className={s.info}> 
                        <h4>{t("Информация профиля")}</h4>
                            { isLoad ? <div className={s.profileForm}>
                               <ProfileInfoForm /> 
                            </div> : <Loader/>}
                    </div>
                    <div className={s.management}>
                        <h4>{t("Управление аккаунтом")}</h4>
                        <div className={s.manageAcc}>
                            {isLoad ? <div className={s.accountForm}>
                                <ManageAccountForm />
                            </div> : <Loader/>}
                        </div>
                        <div className={`${s.infoText}`}>
                            <div className={`${s.description}`}>
                                {t('Вы можете изменить адрес аккаунта на более привлекательный')}.<br />
                                {t('Другие пользователи смогут найти Вас по адресу')} <b>meetins.ru/ВашАдрес</b><br />
                                <b>Отключение</b><br/>
                                {t('Вы можете удалить свой аккаунт, тогда другие пользователи больше не смогут')}<br />
                                {t('Вас найти на нашем сайте')}.
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className={s.deleteBtn} onClick={() => changeModal(true)}>{t("Удалить аккаунт")}</button>
                    </div>
                </div>
            </div>
            <Modal isDisplay={isModal} changeModal={changeModal} actionConfirmed={deleteAccount}>
                <h6>Подвердите действие - Удаление аккаунта.</h6>
            </Modal>
        </div>
    ) 
}