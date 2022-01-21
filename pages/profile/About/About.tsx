import { useStore } from "effector-react";
import React from "react";
import { useState } from "react";
import { $user, User } from "../../../global/store/store";
import s from "./About.module.scss";

export default function About(props: {
    user: User | undefined, 
    about: string,
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
    return(
        <div className={s.about}>
            {authedUser?.status.length! <= 1 && isAuthedProfile
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
             : <p onClick={() => newChangeSatus(true)}>{props.about}</p>
            } 
        </div>
    )
}