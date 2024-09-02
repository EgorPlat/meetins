import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import { ICreateGroup } from "../../../entities/groups";
import { useStore } from "effector-react";
import { $currentInterestsList } from "../../../global/store/store";
import { createNewGroup } from "../../../global/store/groups_model";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
 
export default function CreateNewGroupForm(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    const currentInterestsList$ = useStore($currentInterestsList);
    
    const onChangeGroup = (data: ICreateGroup) => {
        createNewGroup(data);
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeGroup)}>
                <div>
                    <label htmlFor="name">{t("Название сообщества")}</label>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Введите название сообщества" 
                        {...register("name", {required: false, validate: (value) => 
                            value.length >= 40 || value.length <= 5
                                ? "Не менее 5-ти и не более 40-ти символов"
                                : true,
                        })}
                    />
                    {errors.name ? <span>{errors.name.message}</span> : null}
                </div> 
                <div>
                    <label htmlFor="description">{t("Описание для сообщества")}</label>
                    <textarea
                        id="description"
                        placeholder={t("Краткое описание Вашего сообщества")}
                        {...register("description", {required: false, validate: (value) =>
                            value.length === 0 ? "Нельзя оставить пустым" : true
                        })}/>
                    {errors.description ? <span>{errors.description.message}</span> : null}
                </div>
                <div>
                    <label htmlFor="interestsId">{t("Выберите интересы сообщества")}</label>
                    <select 
                        multiple
                        {...register("interestsId", {required: false, validate: (value) =>
                            value.length === 0 ? "Нельзя оставить пустым" : true
                        })}
                    >
                        {
                            currentInterestsList$.map(el => (
                                <option key={el.interestId} value={el.interestId}>{el.title}</option>
                            ))
                        }
                    </select>
                    {errors.interestsId ? <span>{errors.interestsId.message}</span> : null}
                </div>
                <CustomButton type="submit" text={t("Создать сообщество")} />
            </form>
        </FormContainer>
    )
}