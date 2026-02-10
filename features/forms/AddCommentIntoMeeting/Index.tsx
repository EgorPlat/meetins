import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUnit } from "effector-react";
import { handleSendCommentIntoMeeting, selectedMeeting } from "../../../global/store/meetings_model";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import CustomInput from "@/shared/ui/CustomInput/CustomInput";
import { IoSend } from "react-icons/io5";
 
export default function AddCommentIntoMeeting(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<{ text: string }>();
    const { t } = useTranslation();
    const selectedMeeting$ = useUnit(selectedMeeting);

    const onChangeComment = (data: {
        text: string, 
    }) => {
        handleSendCommentIntoMeeting({ meetingId: selectedMeeting$.meetingId, text: data.text })
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeComment)}>
                <div className="field">
                    <label htmlFor="text">
                        {t("Тект комментария")}
                    </label>
                    <CustomInput
                        type="text" 
                        id="text"
                        placeholder={t("Введите комментарий")}
                        {...register("text", { required: false, validate: (value) => 
                            value.length >= 600 || value.length <= 5
                                ? t("Не менее 5-ти и не более 600 символов")
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