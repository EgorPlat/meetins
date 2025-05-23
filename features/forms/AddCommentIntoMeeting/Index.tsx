import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUnit } from "effector-react";
import { handleSendCommentIntoMeeting, selectedMeeting } from "../../../global/store/meetings_model";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
 
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
                    <input 
                        type="text" 
                        id="text"
                        placeholder={t("Текст комментария")} 
                        {...register("text", { required: false, validate: (value) => 
                            value.length >= 600 || value.length <= 5
                                ? t("Не менее 5-ти и не более 600 символов")
                                : true,
                        })}
                    />
                    {errors.text ? <span>{errors.text.message}</span> : null}
                </div>
                <CustomButton type="submit" text={t("Добавить комментарий")} />
            </form>
        </FormContainer>
    )
}