import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { createEffect, createEvent, createStore } from 'effector'
import { User } from '../interfaces';
import { instanseRouter } from './router_model';
import { handleLogOut } from './login_model';
import { addNotification } from './notifications_model';

export const baseURL = 'http://localhost:5000/';
//export const baseURL = 'https://meetins-egorplat.amvera.io/';

export const instance = axios.create({
	baseURL: baseURL,
	withCredentials: true,
})
instance.interceptors.request.use((config: AxiosRequestConfig) => {
	config.headers = {
		'Content-Type': 'application/json',
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
	if (ers >= 400 && ers <= 499) {
		const { message } = error.response.data;
		if (message) {
			addNotification({
				text: message,
				color: "orange",
				textColor: "black",
				time: 3000
			});
		}
	}
	if (ers === 401) {
		setIsAsyncLoaded(true);
		handleLogOut();
	}
	return error;
})

export const setIsMobile = createEvent<boolean>();
export const isMobile = createStore<boolean>(false).on(setIsMobile, (_, isMobile) => {
	return isMobile;
})
export const setIsUserLoaded = createEvent<boolean>();
export const isUserLoaded = createStore<boolean>(false).on(setIsUserLoaded, (_, status) => {
	return status;
})
export const setIsCurrentUserLoaded = createEvent<boolean>();
export const isCurrentUserLoaded = createStore<boolean>(false).on(setIsCurrentUserLoaded, (_, status) => {
	return status;
})
export const setIsAsyncLoaded = createEvent<boolean>();
export const isAsyncLoaded = createStore<boolean>(false).on(setIsAsyncLoaded, (_, tokenUpdated) => {
	return tokenUpdated;
})
export const setUser = createEvent<User | null>()
export const $user = createStore<User | null>(null).on(setUser, (_, userDetails) => {
	return userDetails;
})
export const setOnlineUsers = createEvent<any[]>()
export const $onlineUsers = createStore<any[]>([]).on(setOnlineUsers, (_, onlineUserList) => {
	return onlineUserList;
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

export const getUserInterests = createEffect(async (userInterests) => {
	const response = await instance.post('interests/get-ineterests-by-id', JSON.stringify({ interests: userInterests}));
	if(response.status <= 217) {
		return response.data;
	}
})

export const updateInterests = createEffect(async (interests: string[]) => {
	const response = await instance.post('users/updateUserInterest', JSON.stringify({ interests: interests }));
	if(response.status <= 217) {
		setUser(response.data);
		setCurrentProfileUser(response.data);
		return response;
	}
})

export const getInterests = createEffect(async () => {
	const response = await instance.get('interests/get-interests');
	if(response.status <= 217) {
		return response.data;
	}
	return response;
})

export const getUserData = createEffect(async () => {
	setIsUserLoaded(false);
	const response = await instance.get('profile/my-profile');
	if(response.status === 200) {
		setUser(response.data);
		setIsUserLoaded(true);
	}
	return response;
})
export const getInitialUserDataAndCheckAuth = createEffect(() => {
	const instanseRouter$ = instanseRouter.getState();
	const savedRoute = localStorage.getItem("previousPage");
	setIsUserLoaded(false);
	getUserData().then( (res) => {
		if(res.status === 200) {
			setIsUserLoaded(true);
			instanseRouter$?.push(savedRoute);
		} else {
			instanseRouter$?.push('/login');
			//window.location.reload();
		}
	})
});

export const getUserDataByUserId = createEffect(async (userId: string | number) => {
	const response = await instance.post(`users/getUserByUserId`);
	if(response.data) {
		return response.data;
	}
})

export const getUserDataByLoginUrl = createEffect(async (loginUrl: string | number) => {
	setIsUserLoaded(false);
	const response = await instance.get(`profile/by-login/${loginUrl}`);
	if(response.status <= 202) {
		setIsUserLoaded(true);
	}
	return response;
})
export const getDataForProfilePage = createEffect((userId: string) => {
	setIsCurrentUserLoaded(false);
	getUserDataByLoginUrl(userId).then( (res) => {
		if(res.status === 200) {
			setCurrentProfileUser(res.data);
			setIsCurrentUserLoaded(true);
		}
	})
})
export const updateTokens = createEffect(async () => {
	const response = await instance.post('user/refresh-token', localStorage.getItem('refrash-token'));
	if(response.status === 200) {
		localStorage.setItem('access-token', response.data.accessToken);
	    localStorage.setItem('refrash-token', response.data.refreshToken);
	}
	return response;
})

export const sendNewUserPost = createEffect(async (formData: FormData) => {
	const response = await instance.post('users/addUserPost', formData);
	if(response.status === 200) {
		setUser(response.data);
		addNotification({ text: 'Пост успешно создан на вашей странице!', color: 'green', time: 3000, textColor: "white" })
		window.location.reload();
	}
	return response;
})