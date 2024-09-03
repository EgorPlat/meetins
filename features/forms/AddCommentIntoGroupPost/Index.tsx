import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { addNewCommentIntoGroupPost, groupInfo } from "../../../global/store/groups_model";
import { useUnit } from "effector-react";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
 
export default function AddCommentIntoGroupPost(props: {
    postId: number
}): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    const activeGroup$ = useUnit(groupInfo);

    const onChangeComment = (data: {
        text: string, 
    }) => {
        addNewCommentIntoGroupPost({ text: data.text, groupId: activeGroup$.groupId, postId: props.postId });
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeComment)}>
                <div>
                    <input  
                        type="text" 
                        id="text"
                        placeholder="Введите комментарий" 
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