import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { IMarkedUserInfo, IOnlineUser, IUserTag, User } from '../interfaces';
import { instanseRouter } from './router_model';
import { handleLogOut } from './login_model';
import { addNotification } from './notifications_model';
import { IInterest } from '../interfaces/interest';

export const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

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
	if (ers === 401) {
		handleLogOut();
		setIsInithialDataLoaded(true);
	}
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
	return error;
})

export const setIsMobile = createEvent<boolean>();
export const isMobile = createStore<boolean>(false).on(setIsMobile, (_, isMobile) => {
	return isMobile;
})

export const setIsVideoCallOpened = createEvent<boolean>();
export const isVideoCallOpened = createStore<boolean>(false).on(setIsVideoCallOpened, (_, setIsVideoCallOpened) => {
	return setIsVideoCallOpened;
})

export const setIsUserLoaded = createEvent<boolean>();
export const isUserLoaded = createStore<boolean>(false).on(setIsUserLoaded, (_, status) => {
	return status;
})
export const setIsCurrentUserLoaded = createEvent<boolean>();
export const isCurrentUserLoaded = createStore<boolean>(false).on(setIsCurrentUserLoaded, (_, status) => {
	return status;
})
export const setIsInithialDataLoaded = createEvent<boolean>();
export const isInithialDataLoaded = createStore<boolean>(false).on(setIsInithialDataLoaded, (_, status) => {
	return status;
})
export const setUser = createEvent<User | null>()
export const $user = createStore<User | null>(null).on(setUser, (_, userDetails) => {
	return userDetails;
})
export const setOnlineUsers = createEvent<IOnlineUser[]>()
export const $onlineUsers = createStore<IOnlineUser[]>([]).on(setOnlineUsers, (_, onlineUserList) => {
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

export const setIsScrollPageBlocked = createEvent<boolean>()
export const $scrollPageBlocked = createStore<boolean>(false).on(
	setIsScrollPageBlocked,
	(_, scrollPageBlocked) => {
		return scrollPageBlocked;
	}
)

export const setCurrentInterestsList = createEvent<IInterest[]>()
export const addNewInterest = createEvent<IInterest>()
export const $currentInterestsList = createStore<IInterest[]>([])
.on(setCurrentInterestsList, (_, interests) => {
	return interests;
})
.on(addNewInterest, (interests, interest) => {
	return [...interests, interest];
})

export const setMarkedUsersInfo = createEvent<IMarkedUserInfo[]>()
export const $markedUsersInfo = createStore<IMarkedUserInfo[]>([]).on(setMarkedUsersInfo, (_, usersInfo) => {
	return usersInfo;
})

export const getUserInterests = createEffect(async (userInterests) => {
	const response = await instance.post('interests/get-ineterests-by-id', JSON.stringify({ interests: userInterests}));
	if(response.status <= 217) {
		return response.data;
	}
})

export const addUserIntoMarkedList = createEffect(async (userId: string) => {
	const response = await instance.post('users/addUserIntoMarkedList', JSON.stringify({ neededUserId: userId }));
	return response;
})

export const removeUserFromMarkedList = createEffect(async (userId: string) => {
	const response = await instance.delete(`users/removeUserFromMarkedList/${userId}`);
	return response;
})

export const updateInterests = createEffect(async (interests: string[]) => {
	const response = await instance.post('users/updateUserInterest', JSON.stringify({ interests: interests }));
	if(response.status <= 217) {
		setUser(response.data);
		setCurrentProfileUser(response.data);
		return response;
	}
})

export const getMarkedUsersInfo = createEffect(async () => {
	const response = await instance.get('users/getMarkedUsersInfo');
	return response;
})

export const getInterests = createEffect(async () => {
	const response = await instance.get('interests/get-interests');
	return response;
})

export const addInterest = createEffect(async (title: string) => {
	const response = await instance.post('interests/add-interest', { title });
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
			setIsInithialDataLoaded(true);
			setIsUserLoaded(true);
			if (
				instanseRouter$.asPath.includes('login') ||
				instanseRouter$.asPath.includes('register') ||
				instanseRouter$.asPath === '/'
			) {
				instanseRouter$?.push(savedRoute);
			}
		} else {
			instanseRouter$?.push('/login');
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

export const sendNewUserPost = createEffect(async (formData: FormData) => {
	const response = await instance.post('users/addUserPost', formData);
	if(response.status === 200) {
		setUser(response.data);
		addNotification({ text: 'Пост успешно создан на вашей странице!', color: 'green', time: 3000, textColor: "white" })
	}
	return response;
})

export const updateUserTag = createEffect(async (data: IUserTag) => {
	const response = await instance.put('users/updateUserTag', data);
	return response;
})

export const likeUserPost = createEffect(async (data: { userId: string, postId: string }) => {
	const response = await instance.put(`users/like/${data.userId}/${data.postId}`);
	return response;
})

export const unlikeUserPost = createEffect(async (data: { userId: string, postId: string }) => {
	const response = await instance.put(`users/remove-like/${data.userId}/${data.postId}`);
	return response;
})

sample({
	clock: [likeUserPost.doneData, unlikeUserPost.doneData],
	filter: (res) => res.status <= 217,
	fn: (res) => res.data,
	target: setCurrentProfileUser
})

sample({
	clock: [addInterest.doneData],
	filter: (res) => res.status <= 217,
	fn: (res) => res.data,
	target: addNewInterest
})

sample({
	clock: getInterests.doneData,
	filter: (res) => res.status <= 217,
	fn: (res) => res.data,
	target: setCurrentInterestsList
})

sample({
	clock: [addUserIntoMarkedList.doneData, updateUserTag.doneData],
	filter: (res) => res.status <= 217,
	fn: (res) => res.data,
	target: setUser
})

sample({
	clock: [updateUserTag.doneData],
	filter: (res) => res.status <= 217,
	fn: () => {
		return { time: 3000, color: "green", textColor: "white", text: "Изменения вступят после перезахода в профиль." }
	},
	target: addNotification
})

sample({
	clock: [getMarkedUsersInfo.doneData, removeUserFromMarkedList.doneData],
	filter: (res) => res.status <= 217,
	fn: (res) => res.data,
	target: setMarkedUsersInfo
})