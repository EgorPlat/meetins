import { instanseRouter } from './router_model';
import { instance, setUser } from './store'
import { attach, createEffect, createEvent, createStore, sample } from 'effector'


type LoginDetailsType = {
	email: string,
	password: string 
} | null 

export const sendLogData = createEffect((async (logDetails: LoginDetailsType) => {
	const response = await instance.post('auth/login', logDetails);
	return response;
}));
export const handleLogOut = createEffect((async () => {
	const response = await instance.get('auth/logout')
	return response;
}));

export const setLoginDetails = createEvent<LoginDetailsType>()
export const $loginDetails = createStore<LoginDetailsType>(null).on(
	setLoginDetails,
	(_, newLogDetails) => {
		return newLogDetails
	}  
)
export const setLoginLoading = createEvent<boolean>()
export const $loginLoading = createStore<boolean>(false).on(
	setLoginLoading,
	(_, status) => {
		return status
	}  
) 

export const saveDataAfterLogin = createEffect((data: any) => {
	const router = instanseRouter.getState();
	setUser(data.profile.user);
	setLoginLoading(true);
	router.push(`profile/${data.profile.user.login}`);
});

sample({
	clock: sendLogData.doneData,
	filter: response => response.status <= 201,
	fn: response => response.data,
	target: saveDataAfterLogin
});