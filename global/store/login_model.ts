import { instance, setUser } from './store'
import { createEffect, createEvent, createStore } from 'effector'


type LoginDetailsType = {
	email: string,
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
	const response = await instance.post('auth/login', JSON.stringify(logDetails))
	if(response.status === 200) {
		localStorage.setItem("access-token", response.data.auth.token);
		//localStorage.setItem("refrash-token", response.data.auth.refreshToken);		
		setUser(response.data.profile.user);
	}
	console.log(response);
	return response;
})