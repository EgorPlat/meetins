import React from "react";
import s from "./settings.module.scss";

export default function Settings(): JSX.Element {
    return(
        <div className={`${s.settings}`}>
            <h3>Настройки</h3>
        </div>
    )
}