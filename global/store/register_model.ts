import { instance, setUser } from './store'
import { createEffect, createEvent, createStore } from 'effector'

type RegisterDetailsType = {
	firstName: string
	lastName: string
	phoneNumber: string | null 
	email: string | null
	password: string 
	gender: string
	dateRegister: string
} | null
 
export const sendRegData = createEffect()
export const getUsers = createEffect()

export const setRegisterDetails = createEvent<RegisterDetailsType>()
export const $registerDetails = createStore<RegisterDetailsType>(null).on(
	setRegisterDetails,
	(_, newRegDetails) => {
		return newRegDetails
	}
) 

sendRegData.use(async (regDetails) => {
	const response = await instance.post('user/register-user', JSON.stringify(regDetails))
	if(response.status === 200) {
		localStorage.setItem('access-token', response.data.authenticateResponse.accessToken);
		localStorage.setItem('refrash-token', response.data.authenticateResponse.refreshToken);
		setUser(response.data.profile);
	}
	return response;
})

getUsers.use(async () => {
	const data = await instance.get('user/get-users')
	console.log(data)
	return data
})
