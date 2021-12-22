import axios from 'axios'
import { createEvent, createStore } from 'effector'

export const instance = axios.create({
	baseURL: 'https://api.meetins.ru/',
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
	if(res.status === 200) { return res; }
}, (errors: any) => {
	if(errors.response.status === 401) { 
		updateTokens().then((res: any) => {
			if(res.status <= 227) {
				const config = errors.config;
				config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access-token');
				axios.request(config).then((res) => {
					if(res.status === 200) {
						setUser(res.data);
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
	dateRegister: string
}

export const setUser = createEvent<User>()
export const $user = createStore<User | null>(null).on(setUser, (_, userDetails) => {
	return userDetails
})

export const setCurrentPage = createEvent<string>()
export const $currentPage = createStore<string>('').on(
	setCurrentPage,
	(_, currPage) => currPage
)

export const getUserData = async () => {
	const response = await instance.get('user/my-profile');
	return response;
}
export const updateTokens = async () => {
	const response = await instance.post('user/refresh-token', {refreshToken: localStorage.getItem('refrash-token')});
	localStorage.setItem('access-token', response.data.accessToken);
	localStorage.setItem('refrash-token', response.data.refreshToken);
	return response;
}