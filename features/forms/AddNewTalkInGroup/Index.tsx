import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import { createNewTalkInGroup } from "../../../global/store/groups_model";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
 
export default function AddNewTalkInGroup(props: {
    groupId: string,
    successSubmit: () => void
}): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<{ title: string }>();
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
                <div className="field">
                    <label htmlFor="title">
                        {t("Тема обсуждения")}
                    </label>
                    <input 
                        type="text" 
                        id="title"
                        placeholder="Тема обсуждения" 
                        {...register("title", { required: false, validate: (value) => 
                            value.length >= 20 || value.length <= 5
                                ? "Не менее 5-ти и не более 20-ти символов"
                                : true,
                        })}
                    />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </div>
                <CustomButton type="submit" text={t("Начать обсуждение")} />
            </form>
        </FormContainer>
    )
}