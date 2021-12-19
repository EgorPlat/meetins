import { instance } from './store'
import { createEffect, createEvent, createStore } from 'effector'


type LoginDetailsType = {
	emailOrPhone: string,
	password: string 
} | null 

export const sendLogData = createEffect()

export const setLoginDetails = createEvent<LoginDetailsType>()
export const $loginDetails = createStore<LoginDetailsType>(null).on(
	setLoginDetails,
	(_, newLogDetails) => {
		return newLogDetails
	} 
)

sendLogData.use(async (logDetails) => {
	const response = await instance.post('user/authenticate', JSON.stringify(logDetails))
	if(response.status === 200) {
		localStorage.setItem('isLogged', 'true');
		console.log(response.data);
		localStorage.setItem("access-token", response.data.accessToken);
		localStorage.setItem("refrash-token", response.data.refreshToken);
	} else {
		localStorage.setItem('isLogged', 'false');
	}
	return response;
})