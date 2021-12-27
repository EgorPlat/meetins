import React, { useState } from "react";
import s from "./settings.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { useStore } from "effector-react";
import { isTokenUpdated, setCurrentPage } from "../../global/store/store";
import Loader from "../../global/Loader/Loader";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "../../global/helpers/Modal/Modal";
import ProfileInfoForm from "../../global/Forms/ProfileInfo/Index";
import ManageAccountForm from "../../global/Forms/ManageAccount/Index";

export default function Settings(): JSX.Element {

    const isLoad = useStore(isTokenUpdated);
    const router = useRouter();
    

    useEffect(() => {
        setCurrentPage(router.pathname)
    }, []) 
    return(
        <div className={`${s.settings}`}>
            <div className="row">
                <div className={`col-sm-3 ${s.menu}`}>
                    <div><Link href = ''>Аккаунт</Link></div>
                    <div><Link href = ''>Подписка</Link></div>
                </div>
                <div className={`col-sm-9 ${s.formAndInfo}`}>
                    <div className={s.info}> 
                        <h5>Информация профиля</h5>
                            { isLoad ? <div className="row">
                               <ProfileInfoForm /> 
                            </div> : <Loader/>}
                    </div>
                    <div className={s.management}>
                        <h5>Управление аккаунтом</h5>
                        <div className={s.manageAcc}>
                            {isLoad ? <div className={`row`}>
                                <ManageAccountForm />
                            </div> : <Loader/>}
                        </div>
                        <div className={`row ${s.infoText}`}>
                            <div className={`col ${s.description}`}>
                                Вы можете изменить адрес аккаунта на более привлекательный.<br />
                                Другие пользователи смогут найти Вас по адресу <b>meetins.ru/ВашАдрес</b><br />
                                <b>Отключение</b><br/>
                                Вы можете удалить свой аккаунт, тогда другие пользователи больше не смогут<br />
                                Вас найти на нашем сайте.
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className={s.deleteBtn}>Удалить аккаунт</button>
                    </div>
                </div>
            </div>
            <Modal isDisplay={false}>
                <div>
                    <h6>Подвердите действие - Удаление аккаунта. </h6>
                    <button className={s.deleteBtn}>Удалить</button>
                    <button className={s.closeBtn}>Закрыть</button>
                </div>
            </Modal>
        </div>
    ) 
}