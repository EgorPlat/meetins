import React from "react";
import { useState } from "react";
import s from "./About.module.scss";

export default function About(props: {about: string}): JSX.Element {

    const [changingStatus, setChangingStatus] = useState<boolean>(false);

    const newChangeSatus = (status: boolean) => {
        setChangingStatus(() => status);
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