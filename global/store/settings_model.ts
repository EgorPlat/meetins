import { AxiosResponse } from "axios";
import { createEffect, createEvent, createStore } from "effector";
import { AccountData, instance, ProfileData, setUser, User } from "./store";

export const setIsProfileUpdated = createEvent<boolean | null>();
export const isProfileUpdated = createStore<boolean | null>(null).on(setIsProfileUpdated, (_, profileUpdated) => {
	return profileUpdated;
})
export const updateUserProfileData = async (newUserData: ProfileData) => {
	setIsProfileUpdated(false);
	const response = await instance.post('settings/edit-profile', JSON.stringify(newUserData));
	if(response.status === 200) {
		setUser(response.data);
		setIsProfileUpdated(true);
	}
	return response;
}
export const setIsAccountUpdated = createEvent<boolean | null>();
export const isAccountUpdated = createStore<boolean | null>(null).on(setIsAccountUpdated, (_, accountUpdated) => {
	return accountUpdated;
})
export const updateUserAccountData = async (newUserData: AccountData) => {
	setIsAccountUpdated(false);
	const response = await instance.post('settings/edit-account', JSON.stringify(newUserData));
	if(response.status === 200) {
		setUser(response.data);
		setIsAccountUpdated(true);
	}
	return response;
}
export const updateUserAvatar = createEffect();
updateUserAvatar.use(async (event: any) => {
	
	const image = event.target.files[0];
	const formData = new FormData();
	formData.append('uploadedFile', image);

	const response = await instance.post<User>('profile/update-avatar', formData);
	return response;
})

export const updateUserStatus = createEffect();
updateUserStatus.use( async (userStatus) => {
	const response = await instance.post<User>('profile/update-status', userStatus);
	return response;
})