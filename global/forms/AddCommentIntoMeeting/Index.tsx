import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../components/FormContainer/FormContainer";
import { useStore } from "effector-react";
import { handleSendCommentIntoMeeting, selectedMeeting } from "../../store/meetings_model";
import CustomButton from "../../components-ui/CustomButton/CustomButton";
 
export default function AddCommentIntoMeeting(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    const selectedMeeting$ = useStore(selectedMeeting);

    const onChangeComment = (data: {
        text: string, 
    }) => {
        handleSendCommentIntoMeeting({ meetingId: selectedMeeting$.meetingId, text: data.text})
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeComment)}>
                <div>
                    <label htmlFor="text">
                        {t("Тект комментария")}
                    </label>
                    <input 
                        type="text" 
                        id="text"
                        placeholder="Текст комментария" 
                        {...register("text", {required: false, validate: (value) => 
                            value.length >= 600 || value.length <= 5
                                ? "Не менее 5-ти и не более 600 символов"
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