import axios from 'axios'
import { createEvent, createStore } from 'effector'

const iinstance = axios.create({
	baseURL: 'https://api.meetins.ru/',
	headers: {
        'Content-Type': 'application/json',
    }
})
iinstance.interceptors.request.use((config: any) => {
	if(localStorage.getItem('access-token') !== '') {
		config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access-token');
	}
	return config;
}, (errors: any) => {
	return Promise.reject(errors);
})
export const instance = iinstance;



export type User = {
	firstName: string,
	lastName: string,
	phoneNumber: string,
	email: string,
	gender: string,
	userIcon: string,
	dateRegister: string
}

export const setUser = createEvent()
export const $user = createStore(null).on(setUser, (_, userDetails) => {
	return userDetails
})

export const setCurrentPage = createEvent<string>()
export const $currentPage = createStore<string>('').on(
	setCurrentPage,
	(_, currPage) => currPage
)
