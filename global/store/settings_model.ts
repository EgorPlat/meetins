import { createEvent, createStore } from "effector";
import { AccountData, instance, ProfileData, setUser } from "./store";

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