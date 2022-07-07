import { instance, setUser } from './store'
import { createEffect, createEvent, createStore, sample } from 'effector'

type RegisterDetailsType = {
	name: string
	email: string | null
	password: string 
	gender: string
	city: string
} | null
 
export const sendRegData = createEffect(async (regDetails: RegisterDetailsType) => {
	const response = await instance.post('auth/registration', regDetails)
	return response;
})

export const setRegisterDetails = createEvent<RegisterDetailsType>()
export const $registerDetails = createStore<RegisterDetailsType>(null).on(
	setRegisterDetails,
	(_, newRegDetails) => {
		return newRegDetails
	}
) 
const saveDataAfterRegsiter = createEffect((data: any) => {
	localStorage.setItem('access-token', data.auth.token);
	setUser(data.profile.user);
})

sample({
	clock: sendRegData.doneData,
	filter: response => response.status === 201,
	fn: response => response.data,
	target: saveDataAfterRegsiter
})