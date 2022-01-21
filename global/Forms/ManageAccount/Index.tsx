import { useStore } from "effector-react";
import React from "react";
import { useForm } from "react-hook-form";
import { isAccountUpdated, updateUserAccountData } from "../../store/settings_model";
import { $user } from "../../store/store";
import s from "./manageAccount.module.scss";

export default function ManageAccountForm(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const user = useStore($user);
    const isUpdated: boolean | null = useStore(isAccountUpdated);

    const onChangeAccount = (data: {email: string, password: string, loginUrl: string}) => {
        updateUserAccountData(data);
    }
    return (
        <div className={s.manageAcc}>
            <form onSubmit={handleSubmit(onChangeAccount)}>
            <div className={s.formElem}> 
                <label htmlFor="email">Ваш Email</label>
                <input type="text" id="email" 
                    placeholder={user?.email} {...register("email", {required: false, validate: (value) =>
                    value.length === 0 ? "Это поле обязательно к заполнению." : true})}
                />
                {errors.email ? <span className={s.spanError}>{errors.email.message}</span> : null}
            </div>
            <div className={s.formElem}>
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" placeholder="******" {...register("password", {required: false})}/>
            </div>
            <div className={s.formElem}>
                <label htmlFor="address">Адрес аккаунта</label>
                <input type="text" id="address"
                    placeholder={user?.loginUrl}
                    {...register("loginUrl", {required: false, validate: (value) => 
                    value === user?.loginUrl ? "Новый адрес не может совпадать со старым." : true
                    })}
                />
                {errors.loginUrl ? <span className={s.spanError}>{errors.loginUrl.message}</span> : null}
            </div>
            { isUpdated 
            ? <div className={s.successActionDiv}>Данные успешно сохранены!</div> 
            : isUpdated !== null 
            ? <div className={s.unSuccessActionDiv}>Пожалуйста введите уникальные данные (email, адрес)</div>
            : null }
            <button type="submit" className={s.saveButton}>Сохранить</button>
            </form>
        </div>
    )
}