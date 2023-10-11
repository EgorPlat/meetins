import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import s from "./addMusicForm.module.scss";
 
export default function AddMusic(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    
    const onChangeMusic = (data: {name: string, composition: any, description: string}) => {
        console.log(data);
    }
    return (
        <div className={s.info}>
            <form onSubmit={handleSubmit(onChangeMusic)}>
            <div className={s.formElem}>
                <label htmlFor="name">
                    {t("Псевдоним автора")}
                </label>
                <input 
                    type="text" 
                    id="name"
                    placeholder="Псевдоним автора" 
                    {...register("name", {required: false, validate: (value) => 
			            value.length >= 20 || value.length <= 5
				        ? 'Не менее 5-ти и не более 20-ти символов'
				        : true,
                    })}
                />
                {errors.name ? <span className={s.spanError}>{errors.name.message}</span> : null}
            </div>
            <div className={s.formElem}>
                <label htmlFor="phone">{t("Краткое описание композиции")}</label>
                <textarea
                    id="description"
                    placeholder={t("Краткое описание композиции")}
                    {...register("description", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.description ? <span className={s.spanError}>{errors.description.message}</span> : null}
            </div>
            <div className={s.formElem}>
                <label htmlFor="phone">{t("Файл композиции")}</label>
                <input
                    accept=".mp3,.ape"
                    id="composition"
                    type="file"
                    placeholder={t("Краткое описание композиции")}
                    {...register("composition", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.composition ? <span className={s.spanError}>{errors.composition.message}</span> : null}
            </div>
            <button type="submit" className={s.saveButton}>{t("Добавить композицию")}</button>
            </form>
        </div>
    )
}