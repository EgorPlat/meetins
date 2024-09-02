import React, { ChangeEvent, useRef } from "react";
import { useTranslation } from "react-i18next";
import s from "./InputFile.module.scss";

export default function InputFile(props: { onMouseLeave: () => void, onChange: (event: ChangeEvent<HTMLInputElement>) => void }) {

    const ref = useRef(null);
    const { t } = useTranslation();

    return( 
        <div className={s.formGroup} onMouseLeave={props.onMouseLeave}>
            <span className={s.inputFileTitle}>{t("Выбрать фото")}</span>
            <label className={s.label}>
                <input 
                    ref={ref} 
                    type="file" 
                    className={s.inputTypeFile} 
                    onChange={(event) => props.onChange(event)} accept=".jpg,.jpeg,.png,.gif"
                />
            </label>
        </div>
    )
}