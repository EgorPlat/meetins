import Image from 'next/image'
import { useForm } from 'react-hook-form'
import Input from '../../global/helpers/Input/Input'
import loginIcon from '../../public/images/login.svg'
import passIcon from '../../public/images/pass.svg'
import phoneIcon from '../../public/images/phone.svg'
import femaleIcon from '../../public/images/female.svg'
import maleIcon from '../../public/images/male.svg'
import s from '../../styles/pageStyles/auth.module.scss'
import { useState } from 'react'
import EyeIcon from '../../global/helpers/Icons/EyeIcon'
import {
	isEmail,
	isPhoneNumber,
	validateEmailOrPhone,
} from '../../global/helpers/validate'
import {
	sendRegData,
	setRegisterDetails,
} from '../../global/store/register_model'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Login(): JSX.Element {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const [gender, setGender] = useState<string>('')
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const router = useRouter();

	const sendLoginData = (data: {
		name: string
		phone_or_email: string | null
		pass: string
		gender: string
	}) => {
		const phoneNumber = isPhoneNumber(data.phone_or_email)
		const email = isEmail(data.phone_or_email)
		const nameArr = data.name.split(' ')

		setRegisterDetails({
			firstName: nameArr[0],
			lastName: nameArr[1],
			phoneNumber: phoneNumber,
			email,
			password: data.pass,
			gender: data.gender,
			dateRegister: new Date(
				new Date().toString().split('GMT')[0] + ' UTC'
			)
				.toISOString()
				.split('.')[0],
		})

		sendRegData({
			firstName: nameArr[0],
			lastName: nameArr[1],
			phoneNumber: phoneNumber,
			email,
			password: data.pass,
			gender: data.gender,
			dateRegister: new Date(
				new Date().toString().split('GMT')[0] + ' UTC'
			)
				.toISOString()
				.split('.')[0],
		}).then( (res: any) => {
			if(localStorage.getItem('access-token') !== '') {
				router.push(`/profile/${res.data.profile.loginUrl}`);
			}
		})
	}

	return (
		<div className={s.card}>
			<Head>
				<title>Регистрация</title>
			</Head>
			<h2>Регистрация</h2>
			<form autoComplete='off' onSubmit={handleSubmit(sendLoginData)}>
				<Input
					icon={loginIcon}
					placeholder='Имя и фамилия'
					type='text'
					id='login'
					autocomplete={'off'}
					className={errors.name && s.errorBorder}
					style={{ marginTop: '82px' }}
					register={register('name', {
						required: true,
						validate: (value) =>
							/^[a-zа-яё]+ [a-zа-яё]+$/i.test(value) === false
								? 'Пожалуйста следуйте формату: Имя Фамилия'
								: true,
					})}
				/>
				{errors.name && (
					<span className={s.errorSpan}>{errors.name.message}</span>
				)}
				<Input
					icon={phoneIcon}
					placeholder='Телефон или e-mail'
					type='text' 
					id='phoneOrEmail'
					style={{ marginTop: '25px' }}
					className={errors.phone_or_email && s.errorBorder}
					register={register('phone_or_email', {
						required: true,
						validate: (value) => validateEmailOrPhone(value),
					})}
				/>
				{errors.phone_or_email && (
					<span className={s.errorSpan}>
						{errors.phone_or_email.message}
					</span>
				)}

				<Input
					icon={passIcon}
					placeholder='Придумайте пароль'
					type={!showPassword ? 'password' : 'text'}
					id='pass'
					style={{ marginTop: '25px' }}
					register={register('pass', {
						required: true,
					})}>
					<EyeIcon
						onClick={() => {
							setShowPassword(!showPassword)
						}}
						width={25}
						height={25}
						style={{ cursor: 'pointer' }}
					/>
				</Input>

				<div className={s.gender}>
					<span>Выберите пол:</span>
					<label
						onClick={() => setGender('male')}
						className={gender === 'male' ? `${s.checked}` : ''}
						htmlFor='gender_male'>
						<Image
							src={maleIcon}
							alt='male icon'
							width={40}
							height={40}
						/>
					</label>
					<input
						{...register('gender', { required: true })}
						id='gender_male'
						value='male'
						type='radio'
					/>
					<label
						onClick={() => setGender('female')}
						className={gender === 'female' ? `${s.checked}` : ''}
						htmlFor='gender_female'>
						<Image
							src={femaleIcon}
							alt='female icon'
							width={40}
							height={40}
						/>
					</label>
					<input
						{...register('gender', { required: true })}
						id='gender_female'
						value='female'
						type='radio'
					/>
				</div>
				{errors.gender && (
					<span className={s.errorSpan}>Пожалуйста укажите пол</span>
				)}
				<button type='submit' className={` btn ${s.submitBtn}`}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	)
}
