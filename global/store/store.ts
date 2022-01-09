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
	setIsTokenUpdated(false);
	if(res.status === 200) { 
		setIsTokenUpdated(true); 
		return res; 
	}
}, (errors: any) => {
	setIsTokenUpdated(false);
	if(errors.response.status === 415) {
		axios.getUri(errors.config);
		setIsTokenUpdated(true);
	}
	if(errors.response.status >= 400) {
		updateTokens().then((res: any) => {
			if(res.status <= 227) {
				const config = errors.config;
				config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access-token');
				axios.request(config).then((res) => {
					if(res.status === 200) {
						console.log(axios.getUri(config));
						if(axios.getUri(config) === "profile/my-profile") {
							setUser(res.data)
						}
						setIsTokenUpdated(true);
					}
				})
			}
		})
		return Promise.reject(errors);
	}
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

export const setIsTokenUpdated = createEvent<boolean>();
export const isTokenUpdated = createStore<boolean>(false).on(setIsTokenUpdated, (_, tokenUpdated) => {
	return tokenUpdated;
})

export const setUser = createEvent<User | null>()
export const $user = createStore<User | null>(null).on(setUser, (_, userDetails) => {
	return userDetails
})

export const setCurrentPage = createEvent<string>()
export const $currentPage = createStore<string>('').on(
	setCurrentPage,
	(_, currPage) => currPage
)

export const getUserData = async () => {
	const response = await instance.get('profile/my-profile');
	if(response.status === 200) {
		setUser(response.data);
	}
	return response;
}
export const getUserDataByLoginUrl = async (loginUrl: string | string[] | undefined) => {
	setIsTokenUpdated(false);
	const response = await instance.post('profile/by-loginurl', JSON.stringify(loginUrl));
	return response;
}
export const updateTokens = async () => {
	const response = await instance.post('user/refresh-token', {refreshToken: localStorage.getItem('refrash-token')});
	localStorage.setItem('access-token', response.data.accessToken);
	localStorage.setItem('refrash-token', response.data.refreshToken);
	return response;
}