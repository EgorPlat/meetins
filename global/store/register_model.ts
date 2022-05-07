import { instance, setUser } from './store'
import { createEffect, createEvent, createStore } from 'effector'

type RegisterDetailsType = {
	name: string
	email: string | null
	password: string 
	gender: string
	city: string
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
	const response = await instance.post('auth/registration', JSON.stringify(regDetails))
	if(response?.status === 201) {
		localStorage.setItem('access-token', response.data.auth.token);
		setUser(response.data.profile);
	}
	return response;
})

getUsers.use(async () => {
	const data = await instance.get('user/get-users')
	console.log(data)
	return data
})
