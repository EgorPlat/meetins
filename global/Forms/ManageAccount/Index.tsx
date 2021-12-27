import { useStore } from "effector-react";
import React from "react";
import { useForm } from "react-hook-form";
import { $user } from "../../store/store";
import s from "./manageAccount.module.scss";

export default function ManageAccountForm(): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const user = useStore($user);

    const onChangeAccount = (data: {email: string, password: string, address: string}) => {
        console.log(data);
    }
    return (
        <div className={s.manageAcc}>
            <form onSubmit={handleSubmit(onChangeAccount)}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" 
                    placeholder={user?.email} {...register("email", {required: false, validate: (value) =>
                    value.length === 0 ? "Это поле обязательно к заполнению." : true})}
                />
                {errors.email ? <span className={s.spanError}>{errors.email.message}</span> : null}
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" placeholder="******" {...register("password", {required: false})}/>
            </div>
            <div>
                <label htmlFor="address">Адрес аккаунта</label>
                <input type="text" id="address"
                    placeholder={user?.loginUrl}
                    {...register("address", {required: false, validate: (value) => 
                    value === user?.loginUrl ? "Новый адрес не может совпадать со старым." : true
                    })}
                />
                {errors.address ? <span className={s.spanError}>{errors.address.message}</span> : null}
            </div>
            <button type="submit" className={s.saveButton}>Сохранить</button>
            </form>
        </div>
    )
}