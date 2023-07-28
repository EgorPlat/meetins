import { useStore } from "effector-react";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../../global/interfaces";
import { $user } from "../../../global/store/store";
import s from "./About.module.scss";

export default React.memo(function About(props: {
    user: User,
    saveNewUserStatus: (userStatus: string) => void
}): JSX.Element {

    const { t } = useTranslation();
    const [changingStatus, setChangingStatus] = useState<boolean>(false);
    const [userStatus, setUserStatus] = useState<string>("");
    const authedUser = useStore($user);
    const isAuthedProfile = props.user?.login === authedUser?.login;

    const newChangeSatus = (status: boolean) => {  
        if(isAuthedProfile) {
            setChangingStatus(() => status);
        }
    } 
    const saveNewStatus = async () => {
        props.saveNewUserStatus(userStatus);
        newChangeSatus(false);
    }
    if(props.user && authedUser) {
        return(
            <div className={s.about}>
                <b>{t('О себе')}:</b>
                {isAuthedProfile && <span onClick={() => newChangeSatus(true)} className={s.changeSpan}>{t('Изменить')}</span>} 
                {isAuthedProfile && authedUser.status === (null || "")
                 ? <p style={{color: "grey"}} onClick={() => newChangeSatus(true)}>{t('Введите ваш статус')}...</p>
                 : null
                }
                {changingStatus
                 ? 
                <div>
                    <textarea autoFocus className={s.textChange} placeholder={t('Введите текст')} onChange={(event) => setUserStatus(event.target.value)}></textarea>
                    <button className={s.confirmBtn} onClick={saveNewStatus}>ОК</button>
                    <button className={s.cancelBtn} onClick={() => newChangeSatus(false)}>Х</button>
                </div>
                 : <p className={s.status}>{props.user.status}</p>
                } 
            </div>
        )
    } else {
        return(
            <div>Ошибка. Пожалуйста, обновите страницу.</div>
        )
    }
})