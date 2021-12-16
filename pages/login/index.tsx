import { useStore } from 'effector-react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Input from '../../global/helpers/Input/Input'
import { isEmail, isPhoneNumber } from '../../global/helpers/validate'
import { $loginDetails, sendLogData, setLoginDetails } from '../../global/store/login_model'
import { $isLoggedIn } from '../../global/store/store'
import loginIcon from '../../public/images/login.svg'
import passIcon from '../../public/images/pass.svg'
import s from '../../styles/pageStyles/auth.module.scss'
import Router from 'next/router'
import { useState } from 'react'

export default function Login(): JSX.Element {

	const { register, handleSubmit, formState: {errors} } = useForm()
	const isLogged = useStore($isLoggedIn);
	const [errorMessage, setErrorMessage] = useState<string>("");
	
	const sendLoginData = (data: {login: string, password: string}) => {
		const login = data.login;
		const pass = data.password;
		setLoginDetails({
			email: login,
			password: pass,
		})
		sendLogData({
			email: login,
			password: pass,
		}).then((res: any) => {
			if(res.status === 200) {
				Router.push('/profile');
			}
		}, (errors) => {
            setErrorMessage( () => `Ошибка ${errors}. Возможно Вы ввели неправильные данные.`)
		} 
		)
	}
	return (
		<div className={s.card}>
			<Head> 
				<title>Авторизация</title>
			</Head>
			<h2>Вход</h2>
			<form onSubmit={handleSubmit(sendLoginData)}>
				<Input
					icon={loginIcon}
					placeholder='Логин или телефон'
					type='text'
					id='login'
					style={{ marginTop: '82px' }}
					register={register('login', {
						required: true,
						validate: (value) =>
							isPhoneNumber(value) === value 
							? true : isEmail(value) === value ? true : 'Введите корректный e-mail или номер телефона в формате 79699999999',
					})}
				/>
				{ errors.login && <span className={s.errorSpan}>{errors.login.message}</span> }
				<Input
					icon={passIcon}
					placeholder='Пароль'
					type='password'
					id='pass'
					style={{ marginTop: '25px' }}
					register={register('password', {
						required: true
					})}
				/>
				{ errorMessage !== "" ? <span className={s.errorSpan}>{errorMessage}</span> : null }
				<button type='submit' className={`${s.submitBtn} btn`} >
					Войти
				</button>
			</form>
		</div>
	)
}
