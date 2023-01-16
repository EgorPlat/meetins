import Head from 'next/head'
import { useForm } from 'react-hook-form'
import Input from '../../global/helpers/Input/Input'
import { isEmail, isPhoneNumber } from '../../global/helpers/validate'
import { sendLogData, setLoginDetails } from '../../global/store/login_model'
import loginIcon from '../../public/images/login.svg'
import passIcon from '../../public/images/pass.svg'
import s from '../../styles/pageStyles/auth.module.scss'
import Router from 'next/router'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next'

export default function Login(): JSX.Element {

	const { register, handleSubmit, formState: {errors} } = useForm()
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { t } = useTranslation();

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
				Router.push(`/profile/${res.data.profile.user.login}`);
			} else {
				setErrorMessage(() => "Какая-то ошибка.")
			}
		}
		)
	}
	return (
		<div className={s.card}>
			<Head> 
				<title>{t('Вход')}</title>
			</Head>
			<h2>{t('Вход')}</h2>
			<form onSubmit={handleSubmit(sendLoginData)}>
				<Input
					icon={loginIcon}
					placeholder={t('Логин')}
					type='text'
					id='login'
					style={{ marginTop: '82px' }}
					register={register('login', {
						required: true,
						validate: (value) =>
							isEmail(value) === value ? true : t('Введите корректный e-mail в формате *@gmail.com'),
					})}
				/>
				{ errors.login && <span className={s.errorSpan}>{errors.login.message}</span> }
				<Input
					icon={passIcon}
					placeholder={t('Пароль')}
					type='password'
					id='pass'
					style={{ marginTop: '25px' }}
					register={register('password', {
						required: true
					})}
				/>
				{ errorMessage !== "" ? 
				<div className={`row ${s.errorBlock}`}>
					   <div className={`col-md-12`}>
							{t('Вы ввели неверные данные. Пожалуйста проверьте правильность и попробуйте снова')}
					   </div>
				</div> : null }
				<button type='submit' className={`${s.submitBtn} btn`} >
					{t('Войти')}
				</button>
			</form>
		</div>
	)
}
