import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import { useUnit } from "effector-react";
import { groupInfo, manageGroup } from "../../../global/store/groups_model";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
 
interface IManageGroupForm {
    name: string, 
    headImage: FileList, 
    description: string
};

export default function ManageGroup(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<IManageGroupForm>();
    const { t } = useTranslation();
    const groupInfo$ = useUnit(groupInfo);

    const onChangeGroup = (data: IManageGroupForm) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("groupId", String(groupInfo$.groupId));
        formData.append("headImage", data.headImage[0]);    
        manageGroup(formData);
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeGroup)}>
                <div className="field">
                    <label htmlFor="name">{t("Название группы")}</label>
                    <input
                        defaultValue={groupInfo$.name}
                        type="text" 
                        id="name"
                        placeholder="Название группы" 
                        {...register("name", { required: false, validate: (value) => 
			            value.length >= 40 || value.length <= 5
				        ? "Не менее 5-ти и не более 40-ти символов"
				        : true,
                        })}
                    />
                    {errors.name ? <span>{errors.name.message}</span> : null}
                </div>
                <div className="field">
                    <label htmlFor="description">{t("Описание группы")}</label>
                    <textarea
                        defaultValue={groupInfo$.description}
                        id="description"
                        placeholder={t("Описание группы")}
                        {...register("description", { required: false, validate: (value) =>
                            value.length === 0 ? "Нельзя оставить пустым" : true
                        })}/>
                    {errors.description ? <span>{errors.description.message}</span> : null}
                </div>
                <div className="field">
                    <label htmlFor="headImage">{t("Шапка сообщества")}</label>
                    <input
                        accept=".jpg,.png,.jpeg"
                        id="headImage"
                        type="file"
                        placeholder={t("Шапка сообщества")}
                        {...register("headImage", { required: false, validate: (value) =>
                            value.length === 0 || !value ? "Файл для шапки соощества обязателен" : true
                        })}/>
                    {errors.headImage ? <span>{errors.headImage.message}</span> : null}
                </div>
                <CustomButton type="submit" text={t("Сохранить настройки")} />
            </form>
        </FormContainer>
    )
}