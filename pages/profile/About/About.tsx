import { useStore } from "effector-react";
import React from "react";
import { useState } from "react";
import { $user, User } from "../../../global/store/store";
import s from "./About.module.scss";

export default function About(props: {
    user: User,
    saveNewStatus: (userStatus: string) => void
}): JSX.Element {

    const [changingStatus, setChangingStatus] = useState<boolean>(false);
    const [userStatus, setUserStatus] = useState<string>("");
    const authedUser = useStore($user);
    const isAuthedProfile = JSON.stringify(props.user) === JSON.stringify(authedUser);

    const newChangeSatus = (status: boolean) => {  
        if(isAuthedProfile) {
            setChangingStatus(() => status);
        }
    } 
    const saveNewStatus = () => {
        props.saveNewStatus(userStatus);
    }
    if(props.user && authedUser) {
        return(
            <div className={s.about}>
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
                 : <p onClick={() => newChangeSatus(true)}>{props.user.status}</p>
                } 
            </div>
        )
    } else {
        return(
            <div>Ошибка соединения.</div>
        )
    }
}