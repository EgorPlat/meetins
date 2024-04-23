import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../components/FormContainer/FormContainer";
import { ICreateMeeting } from "../../interfaces/meetings";
import { handleCreateNewMeeting } from "../../store/meetings_model";
 
export default function AddNewMeetingForm(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    
    const onChangeMeeting = (data: ICreateMeeting) => {
        handleCreateNewMeeting(data);
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeMeeting)}>
            <div>
                <label htmlFor="title">{t("Название встречи")}</label>
                <input 
                    type="text" 
                    id="title"
                    placeholder="Название встречи" 
                    {...register("title", {required: false, validate: (value) => 
			            value.length >= 40 || value.length <= 5
				        ? 'Не менее 5-ти и не более 40-ти символов'
				        : true,
                    })}
                />
                {errors.title ? <span>{errors.title.message}</span> : null}
            </div> 
            <div>
                <label htmlFor="date">{t("Дата встречи")}</label>
                <input 
                    type="datetime-local" 
                    id="date" 
                    {...register("date", {required: false, validate: (value) =>
                        value.length === 0 ? "Это поле обязательно к заполнению." : true
                    })} 
                    placeholder={t("Дата мероприятия")}
                />
                {errors.date ? <span>{errors.date.message}</span> : null}
            </div>
            <div>
                <label htmlFor="address">{t("Место встречи")}</label>
                <input 
                    type="text" 
                    id="address" 
                    {...register("address", {required: false, validate: (value) =>
                        value.length === 0 ? "Это поле обязательно к заполнению." : true
                    })} 
                    placeholder={t("Место проведения мероприятия")}
                />
                {errors.address ? <span>{errors.address.message}</span> : null}
            </div>
            <div>
                <label htmlFor="goal">{t("В чем цель встречи?")}</label>
                <textarea
                    id="goal"
                    placeholder={t("В чем цель встречи?")}
                    {...register("goal", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.goal ? <span>{errors.goal.message}</span> : null}
            </div>
            <div>
                <label htmlFor="description">{t("Описание встречи?")}</label>
                <textarea
                    id="description"
                    placeholder={t("Краткое описание событий на встрече")}
                    {...register("description", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.description ? <span>{errors.description.message}</span> : null}
            </div>
            <button type="submit">{t("Создать встречу")}</button>
            </form>
        </FormContainer>
    )
}