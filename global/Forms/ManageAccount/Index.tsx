import { useStore } from "effector-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { isAccountUpdated, updateUserAccountData } from "../../store/settings_model";
import { $user } from "../../store/store";
import s from "./manageAccount.module.scss";

export default function ManageAccountForm(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const user = useStore($user);
    const isUpdated: boolean | null = useStore(isAccountUpdated);
    const { t } = useTranslation();

    const onChangeAccount = (data: {email: string, password: string, login: string}) => {
        if (data.password.length !== 0 && data.login.length !== 0) {
            updateUserAccountData(data);
        }
    }
    return (
        <div className={s.manageAcc}>
            <form onSubmit={handleSubmit(onChangeAccount)}>
            <div className={s.formElem}> 
                <label htmlFor="email">{t('Ваш Email')}</label>
                <input type="text" id="email" 
                    placeholder={user?.email} {...register("email", {required: false, validate: (value) =>
                    value.length === 0 ? "Это поле обязательно к заполнению." : true})}
                />
                {errors.email ? <span className={s.spanError}>{errors.email.message}</span> : null}
            </div>
            <div className={s.formElem}>
                <label htmlFor="password">{t('Пароль')}</label>
                <input type="password" id="password" placeholder="******" {...register("password", {required: false})}/>
            </div>
            <div className={s.formElem}>
                <label htmlFor="address">{t('Адрес аккаунта')}</label>
                <input type="text" id="address"
                    placeholder={user?.login}
                    {...register("login", {required: false, validate: (value) => 
                    value === user?.login ? "Новый адрес не может совпадать со старым." : true
                    })}
                />
                {errors.login ? <span className={s.spanError}>{errors.login.message}</span> : null}
            </div>
            { isUpdated 
            ? <div className={s.successActionDiv}>Данные успешно сохранены!</div> 
            : isUpdated !== null 
            ? <div className={s.unSuccessActionDiv}>Пожалуйста введите уникальные данные (email, адрес)</div>
            : null }
                <button type="submit" className={s.saveButton}>{t('Сохранить')}</button>
            </form>
        </div>
    )
}