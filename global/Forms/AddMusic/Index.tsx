import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../components/FormContainer/FormContainer";
 
export default function AddMusic(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    
    const onChangeMusic = (data: {name: string, composition: any, description: string}) => {
        console.log(data);
    }
    return (
        <FormContainer>
                <form onSubmit={handleSubmit(onChangeMusic)}>
                    <div>
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
                        {errors.name ? <span>{errors.name.message}</span> : null}
                    </div>
                    <div>
                        <label htmlFor="phone">{t("Краткое описание композиции")}</label>
                        <textarea
                            id="description"
                            placeholder={t("Краткое описание композиции")}
                            {...register("description", {required: false, validate: (value) =>
                            value.length === 0 ? "Нельзя оставить пустым" : true
                        })}/>
                        {errors.description ? <span>{errors.description.message}</span> : null}
                    </div>
                    <div>
                        <label htmlFor="phone">{t("Файл композиции")}</label>
                        <input
                            accept=".mp3,.ape"
                            id="composition"
                            type="file"
                            placeholder={t("Краткое описание композиции")}
                            {...register("composition", {required: false, validate: (value) =>
                            value.length === 0 ? "Нельзя оставить пустым" : true
                        })}/>
                        {errors.composition ? <span>{errors.composition.message}</span> : null}
                    </div>
                    <button type="submit">{t("Добавить композицию")}</button>
                </form>
        </FormContainer>
    )
}