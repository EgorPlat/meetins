import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { User } from "../../../global/interfaces";
import { $user } from "../../../global/store/store";
import s from "./About.module.scss";

export default React.memo(function About(props: {
    user: User,
    saveNewUserStatus: (userStatus: string) => void
}): JSX.Element {

    const [changingStatus, setChangingStatus] = useState<boolean>(false);
    const [userStatus, setUserStatus] = useState<string>("");
    const authedUser = useStore($user);
    const isAuthedProfile = props.user?.login === authedUser?.login;

    const newChangeSatus = (status: boolean) => {  
        if(isAuthedProfile) {
            setChangingStatus(() => status);
        }
    } 
    const saveNewStatus = () => {
        props.saveNewUserStatus(userStatus);
    }
    useEffect(() => {
        console.log('re-render about');
    })
    if(props.user && authedUser) {
        return(
            <div className={s.about}>
                <p><b>О себе:</b></p> 
                {isAuthedProfile && authedUser.status === (null || "")
                 ? <p style={{color: "grey"}} onClick={() => newChangeSatus(true)}>Введите Ваш статус...</p>
                 : null
                }
                {changingStatus
                 ? 
                <div>
                    <textarea autoFocus className={s.textChange} placeholder="Введите текст..." onChange={(event) => setUserStatus(event.target.value)}></textarea>
                    <button className={s.confirmBtn} onClick={saveNewStatus}>ОК</button>
                    <button className={s.cancelBtn} onClick={() => newChangeSatus(false)}>Х</button>
                </div>
                 : <p onClick={() => newChangeSatus(true)} className={s.status}>{props.user.status}</p>
                } 
            </div>
        )
    } else {
        return(
            <div>Ошибка. Пожалуйста, обновите страницу.</div>
        )
    }
})