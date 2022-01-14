import React from "react";
import s from "./InputFile.module.scss";

export default function InputFile(props: { onMouseLeave: () => void, onChange: (event: any) => void }) {
    return(
        <div className={s.formGroup} onMouseLeave={props.onMouseLeave}>
            <label className={s.label}>
                <div className={s.title}>Добавить файл</div>
                <input type="file" onChange={(event) => props.onChange(event)}/>
            </label>
        </div>
    )
}