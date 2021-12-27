import { useStore } from "effector-react";
import React from "react";
import { useForm } from "react-hook-form";
import { isPhoneNumber } from "../../helpers/validate";
import { $user } from "../../store/store";
import s from "./profileInfo.module.scss";

export default function ProfileInfoForm(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const user = useStore($user);

    const onChangeProfile = (data: {name: string, date: string, phone: string}) => {
        console.log(data);
    }
    return (
        <div className={s.info}>
            <form onSubmit={handleSubmit(onChangeProfile)}>
            <div>
                <label htmlFor="name">Имя и Фамилия</label>
                <input type="text" id="name" 
                    placeholder={user?.firstName + " " + user?.lastName} {...register("name", {required: false, validate: (value) => 
			        /^[a-zа-яё]+ [a-zа-яё]+$/i.test(value) === false
				    ? 'Пожалуйста следуйте формату: Имя Фамилия'
				    : true,
                    })}
                />
                {errors.name ? <span className={s.spanError}>{errors.name.message}</span> : null}
            </div>
            <div>
                <label htmlFor="date">Дата Рождения</label>
                <input type="date" id="date" {...register("date", {required: false, validate: (value) =>
                    value.length === 0 ? "Это поле обязательно к заполнению." : true
                    })} placeholder={user?.birthDate}/>
                    {errors.date ? <span className={s.spanError}>{errors.date.message}</span> : null}
            </div>
            <div>
                <label htmlFor="phone">Мобильный телефон</label>
                <input type="text" id="phone"
                    placeholder={user?.phoneNumber}
                    {...register("phone", {required: false, validate: (value) =>
                    isPhoneNumber(value) !== value ? "Введите телефон в формате 79693461718." : true
                    })}
                />
            </div>
            <button type="submit" className={s.saveButton}>Сохранить</button>
            </form>
        </div>
    )
}