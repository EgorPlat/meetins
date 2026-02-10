import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import { createNewMessageInGroupTalk } from "../../../global/store/groups_model";
import { IGroupTalkMessage } from "../../../entities/groups";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
import CustomInput from "@/shared/ui/CustomInput/CustomInput";
import { IoSend } from "react-icons/io5";
 
export default function AddNewMessageIntoGroupTalk(props: {
    groupId: number,
    talkId: number,
    onSaveMessage: (res: IGroupTalkMessage) => void
}): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<{ text: string }>();
    const { t } = useTranslation();
    
    const handleCreateNewMessage = (data: { text: string }) => {
        createNewMessageInGroupTalk({
            groupId:  props.groupId,
            talkId: props.talkId,
            text: data.text
        }).then((res: any) => {
            props.onSaveMessage(res.data);
        })
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(handleCreateNewMessage)}>
                <div className="field">
                    <CustomInput
                        type="text" 
                        id="text"
                        placeholder={t("Введите комментарий")}
                        {...register("text", { required: false, validate: (value) => 
                            value.length >= 200 || value.length <= 5
                                ? t("Не менее 5-ти и не более 200 символов")
                                : true,
                        })}
                        postFix={<IoSend fontSize={24} />}
                    />
                    {errors.text ? <span>{errors.text.message}</span> : null}
                </div>
            </form>
        </FormContainer>
    )
}