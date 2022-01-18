import { instance, setUser } from './store'
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
	const response = await instance.post('user/login', JSON.stringify(logDetails))
	if(response.status === 200) {
		localStorage.setItem("access-token", response.data.authenticateResponse.accessToken);
		localStorage.setItem("refrash-token", response.data.authenticateResponse.refreshToken);		
		setUser(response.data.profile);
	}
	return response;
})