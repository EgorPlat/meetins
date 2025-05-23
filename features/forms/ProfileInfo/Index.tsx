import { useUnit } from "effector-react";
import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { isPhoneNumber } from "../../../shared/helpers/validate";
import { isProfileUpdated, updateUserProfileData } from "../../../global/store/settings_model";
import { $user } from "../../../global/store/store";
import s from "./profileInfo.module.scss";
import { customizeDateToInputFormatFromDBFormat } from "../../../shared/helpers/helper";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";

interface IProfileInfoForm {
    name: string, 
    birthDate: string, 
    phoneNumber: string
};

export default function ProfileInfoForm(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<IProfileInfoForm>();
    const isUpdated: boolean | null = useUnit(isProfileUpdated);
    const user = useUnit($user);
    const { t } = useTranslation();
    
    const onChangeProfile = (data: {name: string, birthDate: string, phoneNumber: string}) => {
        updateUserProfileData(data); 
    };
    
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeProfile)}>
                <div className={s.group}>
                    <label htmlFor="name">{t("Имя")}</label>
                    <input type="text" id="name"
                        defaultValue={user?.name}
                        placeholder={user?.name} {...register("name", { required: false, validate: (value) => 
			        /^[a-zа-яё]+$/i.test(value) === false
				    ? "Пожалуйста следуйте формату: Имя"
				    : true,
                        })}/>
                    {errors.name ? <span>{errors.name.message}</span> : null}
                </div> 
                <div className={s.group}>
                    <label htmlFor="date">{t("Дата рождения")}</label>
                    <input 
                        type="date" 
                        id="date" 
                        {...register("birthDate", { required: false, validate: (value) =>
                            value.length === 0 ? "Это поле обязательно к заполнению." : true
                        })} 
                        placeholder={user?.birthDate}
                        defaultValue={customizeDateToInputFormatFromDBFormat(user?.birthDate)}
                    />
                    {errors.birthDate ? <span>{errors.birthDate.message}</span> : null}
                </div>
                <div className={s.group}>
                    <label htmlFor="phone">{t("Мобильный телефон")}</label>
                    <input type="text" id="phone"
                        placeholder={user?.phoneNumber}
                        defaultValue={user?.phoneNumber}
                        {...register("phoneNumber", { required: false, validate: (value) =>
                            isPhoneNumber(value) !== value ? "Введите телефон в формате 79693461718." : true
                        })}/>
                    {errors.phoneNumber ? <span>{errors.phoneNumber.message}</span> : null}
                </div>
                { 
                    isUpdated === null ? null :
                        isUpdated 
                            ? <div className={s.successActionDiv}>Данные успешно сохранены!</div> 
                            : <div className={s.unSuccessActionDiv}>Пожалуйста введите уникальные данные (телефон)</div> 
                }
                <CustomButton type="submit" text={t("Сохранить")} />
            </form>
        </FormContainer>
    )
}