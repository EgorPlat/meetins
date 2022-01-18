import { useStore } from "effector-react";
import React from "react";
import { useForm } from "react-hook-form";
import { isPhoneNumber } from "../../helpers/validate";
import { isProfileUpdated, updateUserProfileData } from "../../store/settings_model";
import { $user } from "../../store/store";
import s from "./profileInfo.module.scss";
 
export default function ProfileInfoForm(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const isUpdated: boolean | null = useStore(isProfileUpdated);
    const user = useStore($user);

    const onChangeProfile = (data: {firstNameAndLastName: string, birthDate: string, phoneNumber: string}) => {
        updateUserProfileData(data); 
    }
    return (
        <div className={s.info}>
            <form onSubmit={handleSubmit(onChangeProfile)}>
            <div className={s.formElem}>
                <label htmlFor="name">Имя и Фамилия</label>
                <input type="text" id="name" 
                    placeholder={user?.firstName + " " + user?.lastName} {...register("firstNameAndLastName", {required: false, validate: (value) => 
			        /^[a-zа-яё]+ [a-zа-яё]+$/i.test(value) === false
				    ? 'Пожалуйста следуйте формату: Имя Фамилия'
				    : true,
                })}/>
                {errors.firstNameAndLastName ? <span className={s.spanError}>{errors.firstNameAndLastName.message}</span> : null}
            </div> 
            <div className={s.formElem}>
                <label htmlFor="date">Дата Рождения</label>
                <input type="date" id="date" {...register("birthDate", {required: false, validate: (value) =>
                    value.length === 0 ? "Это поле обязательно к заполнению." : true
                })} placeholder={user?.birthDate}/>
                {errors.birthDate ? <span className={s.spanError}>{errors.birthDate.message}</span> : null}
            </div>
            <div className={s.formElem}>
                <label htmlFor="phone">Мобильный телефон</label>
                <input type="text" id="phone"
                    placeholder={user?.phoneNumber}
                    {...register("phoneNumber", {required: false, validate: (value) =>
                    isPhoneNumber(value) !== value ? "Введите телефон в формате 79693461718." : true
                })}/>
                {errors.phoneNumber ? <span className={s.spanError}>{errors.phoneNumber.message}</span> : null}
            </div>
            { 
            isUpdated === null ? null :
            isUpdated 
            ? <div className={s.successActionDiv}>Данные успешно сохранены!</div> 
            : <div className={s.unSuccessActionDiv}>Пожалуйста введите уникальные данные (телефон)</div> 
            }
            <button type="submit" className={s.saveButton}>Сохранить</button>
            </form>
        </div>
    )
}