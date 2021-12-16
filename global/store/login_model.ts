import { instance, setLoggedIn } from './store'
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
	setLoggedIn(false);
	const response = await instance.post('user/authenticate', JSON.stringify(logDetails))
	if(response.status === 200) {
		setLoggedIn(true);
		console.log(response.data);
		localStorage.setItem("access-token", response.data.access_token);
		localStorage.setItem("refrash-token", response.data.resresh_token);
	} else {
		setLoggedIn(false);
	}
	return response;
})