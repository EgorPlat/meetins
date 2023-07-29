import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import s from "./addMeetingForm.module.scss";
 
export default function AddNewMeetingForm(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    
    const onChangeProfile = (data: {name: string, meetingDate: string, description: string}) => {
        console.log(data);
    }
    return (
        <div className={s.info}>
            <form onSubmit={handleSubmit(onChangeProfile)}>
            <div className={s.formElem}>
                <label htmlFor="name">{t("Название встречи")}</label>
                <input 
                    type="text" 
                    id="name"
                    placeholder="Название встречи" 
                    {...register("name", {required: false, validate: (value) => 
			            value.length >= 20 || value.length <= 5
				        ? 'Не менее 5-ти и не более 20-ти символов'
				        : true,
                    })}
                />
                {errors.name ? <span className={s.spanError}>{errors.name.message}</span> : null}
            </div> 
            <div className={s.formElem}>
                <label htmlFor="date">{t("Дата встречи")}</label>
                <input 
                    type="datetime-local" 
                    id="date" 
                    {...register("meetingDate", {required: false, validate: (value) =>
                        value.length === 0 ? "Это поле обязательно к заполнению." : true
                    })} 
                    placeholder={t("Дата мероприятия")}
                />
                {errors.meetingDate ? <span className={s.spanError}>{errors.meetingDate.message}</span> : null}
            </div>
            <div className={s.formElem}>
                <label htmlFor="phone">{t("В чем цель встречи?")}</label>
                <textarea
                    id="description"
                    placeholder={t("В чем цель встречи?")}
                    {...register("description", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.description ? <span className={s.spanError}>{errors.description.message}</span> : null}
            </div>
            
            <button type="submit" className={s.saveButton}>{t("Создать встречу")}</button>
            </form>
        </div>
    )
}