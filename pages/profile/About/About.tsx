import { useStore } from "effector-react";
import React from "react";
import { useState } from "react";
import { $user, User } from "../../../global/store/store";
import s from "./About.module.scss";

export default function About(props: {user: User | undefined, about: string}): JSX.Element {

    const [changingStatus, setChangingStatus] = useState<boolean>(false);
    const authedUser = useStore($user);
    
    const newChangeSatus = (status: boolean) => {  
        if(JSON.stringify(props.user) === JSON.stringify(authedUser)) {
            setChangingStatus(() => status);
        }
    }
    return(
        <div className={s.about}>
            {changingStatus
            ? <textarea autoFocus className={s.textChange}></textarea>
            : <p onClick={() => newChangeSatus(true)}>{props.about}</p>
            } 
        </div>
    )
}