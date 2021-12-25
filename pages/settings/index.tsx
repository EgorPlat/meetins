import React from "react";
import s from "./settings.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";
import { $user, isTokenUpdated, setCurrentPage } from "../../global/store/store";
import Loader from "../../global/Loader/Loader";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Settings(): JSX.Element {

    const {register, handleSubmit} = useForm();
    const user = useStore($user);
    const isLoad = useStore(isTokenUpdated);
    const router = useRouter();

    const onSubmit = (data: any) => {
        console.log(data);
    }
    useEffect(() => {
        setCurrentPage(router.pathname)
    }, [])
    return(
        <div className={`${s.settings}`}>
            <div className="row">
                <div className={`col-sm-3 ${s.menu}`}>
                    <div><Link href = ''>Аккаунт</Link></div>
                    <div><Link href = ''>Подписка</Link></div>
                </div>
                <div className={`col-sm-9 ${s.formAndInfo}`}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.info}> 
                        <h5>Информация профиля</h5>
                            { isLoad ? <div className="row">
                                <div>
                                    <label htmlFor="name">Имя и Фамилия</label>
                                    <input type="text" id="name" 
                                    value={user?.firstName + " " + user?.lastName} 
                                    placeholder="Имя Фамилия" {...register("name")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date">Дата Рождения</label>
                                    <input type="date" id="date" {...register("date")}/>
                                </div>
                                <div>
                                    <label htmlFor="phone">Мобильный телефон</label>
                                    <input type="text" id="phone"
                                    placeholder="7-999-333-22-11"
                                    {...register("phone")}
                                    />
                                </div>
                            </div> : <Loader/>}
                    </div>
                    <div className={s.management}>
                        <h5>Управление аккаунтом</h5>
                        <div className={s.manageAcc}>
                            {isLoad ? <div className={`row`}>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" id="email" 
                                    value={user?.email} 
                                    placeholder="email@gmail.com" {...register("email")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Пароль</label>
                                    <input type="password" id="password" {...register("password")}/>
                                </div>
                                <div>
                                    <label htmlFor="address">Адрес аккаунта</label>
                                    <input type="text" id="address"
                                    placeholder="Адрес"
                                    {...register("address")}
                                    />
                                </div>
                            </div> : <Loader/>}
                        </div>
                        <button type="submit" className={s.saveButton}>Сохранить</button>
                        <div className="row">
                            <div className={`col ${s.description}`}>
                                Вы можете изменить адрес аккаунта на более привлекательный.<br />
                                Другие пользователи смогут найти Вас по адресу <b>meetins.ru/ВашАдрес</b><br />
                                <b>Отключение</b><br/>
                                Вы можете удалить свой аккаунт, тогда другие пользователи больше не смогут<br />
                                Вас найти на нашем сайте.
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    ) 
}