import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { isEmail, isPassword } from '../../global/helpers/validate'
import { $loginLoading, sendLogData, setLoginDetails } from '../../global/store/login_model'
import loginIcon from '../../public/images/login.svg'
import passIcon from '../../public/images/pass.svg'
import s from '../../styles/pageStyles/auth.module.scss'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next'
import Input from '../../components-ui/Input/Input'
import Link from 'next/link';
import logo from '../../public/images/logo.svg';
import Image from 'next/image';
import CustomLoader from '../../components-ui/CustomLoader/CustomLoader'
import { useStore } from 'effector-react'

export default function Login(): JSX.Element {

	const { register, handleSubmit, formState: {errors} } = useForm()
	const [errorMessage, setErrorMessage] = useState<string>("");
	const loginLoading = useStore($loginLoading);
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
		});
	}
	return (
		<div className={s.cardWrapper}>
			<div className={s.card}>
				<Head> 
					<title>{t('Вход')}</title>
					<meta name="keywords" content="meetins, meetin-s, Meetins, Meetin-s, знакомства, meetings, meet" />
				</Head>
				<h1 style={{ display:"grid" }}>
					<Image
						src={logo}
					/>
					{t('Вход')}
				</h1>
				<form onSubmit={handleSubmit(sendLoginData)}>
					<Input
						icon={loginIcon}
						placeholder={t('Логин')}
						type='text'
						id='login'
						style={{ marginTop: '22px' }}
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
							required: true,
							validate: (value) =>
								isPassword(value) ? true : t('Не менее 6-ми символов, не более 12 символов'),
						})}
					/>
					{ errors.password && <span className={s.errorSpan}>{errors.password.message}</span> }
					{ errorMessage !== "" ? 
					<div className={`row ${s.errorBlock}`}>
						{t('Вы ввели неверные данные. Пожалуйста проверьте правильность и попробуйте снова')}
					</div> : null }
					<button type='submit' className={`${s.submitBtn} btn`} >
						{
							loginLoading ? <CustomLoader /> : t('Войти')
						}
					</button>
					<div className={s.navActions}>
						<Link href="/register">Еще не зарегистрированы?</Link>
					</div>
				</form>
			</div>
		</div>
	)
}
