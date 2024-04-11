import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../components/FormContainer/FormContainer";
import { useStore } from "effector-react";
import { addNewCommentIntoGroupPost, groupInfo } from "../../store/groups_model";
 
export default function AddCommentIntoGroupPost(props: {
    postId: number
}): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    const activeGroup$ = useStore(groupInfo);

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
                                ? 'Не менее 5-ти и не более 600 символов'
                                : true,
                            })}
                        />
                        {errors.text ? <span>{errors.text.message}</span> : null}
                    </div>
                    <button type="submit">{t("Добавить комментарий")}</button>
                </form>
        </FormContainer>
    )
}