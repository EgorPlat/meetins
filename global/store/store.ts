import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { createEffect, createEvent, createStore } from 'effector'
import { NextRouter } from 'next/router';
import { User } from '../interfaces';
import { instanseRouter } from './router_model';

export const baseURL = 'https://meetins.herokuapp.com/';
export const instance = axios.create({
	baseURL: baseURL,
})
instance.interceptors.request.use((config: AxiosRequestConfig) => {
	if(localStorage.getItem('access-token') !== '') {
		config.headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + localStorage.getItem('access-token')
		}
	}
	return config;
}, (errors: AxiosError) => {
	return Promise.reject(errors);
})
instance.interceptors.response.use((response) => {
	return response;
}, (error: AxiosError) => {
	const ec: AxiosRequestConfig = error.config;
	const ers: number | undefined = error.response?.status;
	if(ers === 401) {
		setIsAsyncLoaded(false);
		updateTokens().then(async (res: any) => {
			if(res.status === 200) {
				ec.headers = {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('access-token')
				}
				const response = await axios.request(ec);
				return response;
			} else {
				localStorage.removeItem('access-token');
				localStorage.removeItem('refrash-token');
				return error.response;
			}
		})
	}
	return error;
})

export const setIsAsyncLoaded = createEvent<boolean>();
export const isAsyncLoaded = createStore<boolean>(false).on(setIsAsyncLoaded, (_, tokenUpdated) => {
	return tokenUpdated;
})
export const setUser = createEvent<User | null>()
export const $user = createStore<User | null>(null).on(setUser, (_, userDetails) => {
	return userDetails
})
export const setCurrentProfileUser = createEvent<User>();
export const $currentProfileUser = createStore<User>({} as User).on(setCurrentProfileUser, (_, currentUser) => {
	return currentUser;
})
export const setCurrentPage = createEvent<string>()
export const $currentPage = createStore<string>('').on(
	setCurrentPage,
	(_, currPage) => {
		return currPage;
	}
)

export const getUserData = createEffect(async () => {
	setIsAsyncLoaded(false);
	const response = await instance.get('profile/my-profile');
	if(response.status === 200) {
		setUser(response.data);
		setIsAsyncLoaded(true);
	}
	return response;
})
export const getInitialUserDataAndCheckAuth = createEffect(() => {
	const instanseRouter$ = instanseRouter.getState();
	if(localStorage.getItem('access-token')) {
		setIsAsyncLoaded(false);
		getUserData().then( (res) => {
			if(res.status === 200) {  
				setIsAsyncLoaded(true);
				instanseRouter$?.push('/profile/' + res.data.login);
			} else {
				instanseRouter$?.push('/login');
			}
		})
	} else {
		instanseRouter$?.push('/login');
	}
});
 
export const getUserDataByLoginUrl = createEffect(async (loginUrl: string | number) => {
	setIsAsyncLoaded(false);
	const response = await instance.get(`profile/by-login/${loginUrl}`);
	if(response.status <= 202) {
		setIsAsyncLoaded(true);
	}
	return response;
})
export const getDataForProfilePage = createEffect((route: NextRouter) => {
	if(route.query.id !== undefined) {
		getUserDataByLoginUrl(String(route.query.id)).then( (res) => {
			if(res.status === 200) {
				setCurrentProfileUser(res.data);
			}
			console.log(res);
		}) 
	}
})
export const updateTokens = createEffect(async () => {
	const response = await instance.post('user/refresh-token', localStorage.getItem('refrash-token'));
	if(response.status === 200) {
		localStorage.setItem('access-token', response.data.accessToken);
	    localStorage.setItem('refrash-token', response.data.refreshToken);
	}
	return response;
})