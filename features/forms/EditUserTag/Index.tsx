import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import { useUnit } from "effector-react";
import { $user, updateUserTag } from "../../../global/store/store";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";

interface IEditUserTagForm {
    color: string,    
    title: string
};

export default function EditUserTag(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<IEditUserTagForm>();
    const { t } = useTranslation();
    const user$ = useUnit($user);

    const onChangeTag = (data: IEditUserTagForm) => {
        updateUserTag(data);
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeTag)}>
                <div className="field">
                    <label htmlFor="title">{t("Содержимое")}</label>
                    <input
                        defaultValue={user$?.tag.title}
                        type="text" 
                        id="title"
                        placeholder={t("Содержимое")} 
                        {...register("title", { required: false, validate: (value) => 
                            value.length >= 20 || value.length <= 5
                                ? t("Не менее 5-ти и не более 20-ти символов")
                                : true,
                        })}
                    />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </div> 
                <div className="field">
                    <label htmlFor="color">{t("Цвет фона")}</label>
                    <input 
                        defaultValue={user$?.tag.color}
                        type="color" 
                        id="color" 
                        {...register("color", { required: false })} 
                    />
                    {errors.color ? <span>{errors.color.message}</span> : null}
                </div>
                <CustomButton type="submit" text={t("Сохранить изменения")} />
            </form>
        </FormContainer>
    )
}