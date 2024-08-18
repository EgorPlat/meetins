import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../components/FormContainer/FormContainer";
import { createNewTalkInGroup } from "../../store/groups_model";
 
export default function AddNewTalkInGroup(props: {
    groupId: string,
    successSubmit: () => void
}): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    
    const onAddNewTalkInGroup = (data: { title: string }) => {
        createNewTalkInGroup({
            ...data,
            groupId: props.groupId
        });
        props.successSubmit();
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onAddNewTalkInGroup)}>
                <div>
                    <label htmlFor="title">
                        {t("Тема обсуждения")}
                    </label>
                    <input 
                        type="text" 
                        id="title"
                        placeholder="Тема обсуждения" 
                        {...register("title", {required: false, validate: (value) => 
                            value.length >= 20 || value.length <= 5
                                ? "Не менее 5-ти и не более 20-ти символов"
                                : true,
                        })}
                    />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </div>
                <button type="submit">{t("Начать обсуждение")}</button>
            </form>
        </FormContainer>
    )
}