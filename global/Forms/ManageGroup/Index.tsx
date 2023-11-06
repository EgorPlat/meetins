import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../components/FormContainer/FormContainer";
 
export default function ManageGroup(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    
    const onChangeMusic = (data: {name: string, headImage: any, description: string}) => {
        console.log(data);
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeMusic)}>
            <div>
                <label htmlFor="name">{t("Название группы")}</label>
                <input 
                    type="text" 
                    id="name"
                    placeholder="Название группы" 
                    {...register("name", {required: false, validate: (value) => 
			            value.length >= 20 || value.length <= 5
				        ? 'Не менее 5-ти и не более 20-ти символов'
				        : true,
                    })}
                />
                {errors.name ? <span>{errors.name.message}</span> : null}
            </div>
            <div>
                <label htmlFor="description">{t("Описание группы")}</label>
                <textarea
                    id="description"
                    placeholder={t("Описание группы")}
                    {...register("description", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.description ? <span>{errors.description.message}</span> : null}
            </div>
            <div>
                <label htmlFor="phone">{t("Шапка сообщества")}</label>
                <input
                    accept=".jpg,.png,.jpeg"
                    id="headImage"
                    type="file"
                    placeholder={t("Шапка сообщества")}
                    {...register("headImage", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.composition ? <span>{errors.composition.message}</span> : null}
            </div>
            <button type="submit">{t("Сохранить настройки")}</button>
            </form>
        </FormContainer>
    )
}