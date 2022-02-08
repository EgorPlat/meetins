import { instance, setUser } from './store'
import { createEffect, createEvent, createStore } from 'effector'

type RegisterDetailsType = {
	name: string
	email: string | null
	password: string 
	gender: string
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
		localStorage.setItem('access-token', response.data.auth.accessToken);
		localStorage.setItem('refrash-token', response.data.auth.refreshToken);
		setUser(response.data.profile);
	}
	return response;
})

getUsers.use(async () => {
	const data = await instance.get('user/get-users')
	console.log(data)
	return data
})
