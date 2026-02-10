import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import { createNewTalkInGroup } from "../../../global/store/groups_model";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
import CustomInput from "@/shared/ui/CustomInput/CustomInput";
import { IoSend } from "react-icons/io5";
 
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
                    <CustomInput
                        type="text" 
                        id="text"
                        placeholder={t("Введите название обсуждения")}
                        {...register("title", { required: false, validate: (value) => 
                            value.length >= 600 || value.length <= 5
                                ? t("Не менее 5-ти и не более 20 символов")
                                : true,
                        })}
                        postFix={<IoSend fontSize={24} />}
                    />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </div>
            </form>
        </FormContainer>
    )
}