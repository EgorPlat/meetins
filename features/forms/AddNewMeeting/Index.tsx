import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import { ICreateMeeting } from "../../../entities/meetings";
import { handleCreateNewMeeting } from "../../../global/store/meetings_model";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
 
export default function AddNewMeetingForm({ handleCloseForm }: {
    handleCloseForm: () => void
}): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateMeeting>();
    const { t } = useTranslation();
    
    const onChangeMeeting = (data: ICreateMeeting) => {
        handleCreateNewMeeting(data);
        handleCloseForm();
    };
    
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeMeeting)}>
                <div className="field">
                    <label htmlFor="title">{t("Название встречи")}</label>
                    <input 
                        type="text" 
                        id="title"
                        placeholder={t("Название встречи")}
                        {...register("title", { required: false, validate: (value) => 
                            value.length >= 40 || value.length <= 5
                                ? t("Не менее 5-ти и не более 40-ти символов")
                                : true,
                        })}
                    />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </div> 
                <div className="field">
                    <label htmlFor="date">{t("Дата встречи")}</label>
                    <input 
                        type="datetime-local" 
                        id="date" 
                        {...register("date", { required: false, validate: (value) =>
                            value.length === 0 ? t("Это поле обязательно к заполнению") : true
                        })} 
                        placeholder={t("Дата встречи")}
                    />
                    {errors.date ? <span>{errors.date.message}</span> : null}
                </div>
                <div className="field">
                    <label htmlFor="address">{t("Место встречи")}</label>
                    <input 
                        type="text" 
                        id="address" 
                        {...register("address", { required: false, validate: (value) =>
                            value.length === 0 ? t("Это поле обязательно к заполнению") : true
                        })} 
                        placeholder={t("Место встречи")}
                    />
                    {errors.address ? <span>{errors.address.message}</span> : null}
                </div>
                <div className="field">
                    <label htmlFor="goal">{t("В чем цель встречи?")}</label>
                    <textarea
                        id="goal"
                        placeholder={t("В чем цель встречи?")}
                        {...register("goal", { required: false, validate: (value) =>
                            value.length === 0 ? t("Нельзя оставить пустым") : true
                        })}/>
                    {errors.goal ? <span>{errors.goal.message}</span> : null}
                </div>
                <div className="field">
                    <label htmlFor="description">{t("Описание встречи")}</label>
                    <textarea
                        id="description"
                        placeholder={t("Краткое описание событий на встрече")}
                        {...register("description", { required: false, validate: (value) =>
                            value.length === 0 ? t("Нельзя оставить пустым") : true
                        })}/>
                    {errors.description ? <span>{errors.description.message}</span> : null}
                </div>
                <CustomButton type="submit" text={t("Создать встречу")} />
            </form>
        </FormContainer>
    )
}