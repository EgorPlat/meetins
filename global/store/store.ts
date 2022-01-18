import axios from 'axios'
import { createEvent, createStore } from 'effector'

export const baseURL = 'https://api.meetins.ru/';
export const instance = axios.create({
	baseURL: baseURL,
	headers: {
        'Content-Type': 'application/json'
    }
})
instance.interceptors.request.use((config: any) => {
	if(localStorage.getItem('access-token') !== '') {
		config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access-token');
	}
	return config;
}, (errors: any) => {
	return Promise.reject(errors);
})
instance.interceptors.response.use((res: any) => {
	setIsAsyncLoaded(false);
	if(res.status === 200) { 
		setIsAsyncLoaded(true); 
		return res; 
	}
}, (error: any) => {
	if(error.response.status === 401 || error.response.status === 400) {
		setIsAsyncLoaded(false);
		updateTokens().then((res: any) => {
			if(res.status <= 227) {
				axios.request(error.config).then((res) => {
					if(res.status === 200) {
						if(axios.getUri(error.config).includes("/profile/")) {
							setUser(res.data);
						}
						setIsAsyncLoaded(true);
					}
				})
			}
		})
	} else {
		axios.request(error.config);
	}
	return Promise.reject(error);
})



export type User = {
	firstName: string,
	lastName: string,
	phoneNumber: string,
	email: string,
	gender: string,
	userIcon: string,
	dateRegister: string,
	loginUrl: string,
	birthDate: string
}
export type ProfileData = {
	firstNameAndLastName: string,
	phoneNumber: string,
	birthDate: string
}
export type AccountData = {
	email: string,
	password: string,
	loginUrl: string
}

export const setIsAsyncLoaded = createEvent<boolean>();
export const isAsyncLoaded = createStore<boolean>(false).on(setIsAsyncLoaded, (_, tokenUpdated) => {
	return tokenUpdated;
})

export const setUser = createEvent<User | null>()
export const $user = createStore<User | null>(null).on(setUser, (_, userDetails) => {
	return userDetails
})

export const setCurrentPage = createEvent<string>()
export const $currentPage = createStore<string>('').on(
	setCurrentPage,
	(_, currPage) => {
		return currPage;
	}
)

export const getUserData = async () => {
	const response = await instance.get('profile/my-profile');
	if(response.status === 200) {
		setUser(response.data);
	}
	return response;
}
export const getUserDataByLoginUrl = async (loginUrl: string) => {
	setIsAsyncLoaded(false);
	const response = await instance.post('profile/by-loginurl', loginUrl);
	return response;
}
export const updateTokens = async () => {
	const response = await instance.post('user/refresh-token', {refreshToken: localStorage.getItem('refrash-token')});
	if(response.status <= 227) {
		localStorage.setItem('access-token', response.data.accessToken);
	    localStorage.setItem('refrash-token', response.data.refreshToken);
	}
	return response;
}