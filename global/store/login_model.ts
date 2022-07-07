import { instance, setUser } from './store'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event'
import { User } from '../interfaces'


type LoginDetailsType = {
	email: string,
	password: string 
} | null 

export const sendLogData = createEffect((async (logDetails: LoginDetailsType) => {
	const response = await instance.post('auth/login', logDetails)
	return response;
}))

export const setLoginDetails = createEvent<LoginDetailsType>()
export const $loginDetails = createStore<LoginDetailsType>(null).on(
	setLoginDetails,
	(_, newLogDetails) => {
		return newLogDetails
	}  
) 
export const saveDataAfterLogin = createEffect((data: any) => {
	localStorage.setItem('access-token', data.auth.token);
	setUser(data.profile.user);
})
sample({
	clock: sendLogData.doneData,
	filter: response => response.status === 200,
	fn: response => response.data,
	target: saveDataAfterLogin
})