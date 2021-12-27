import { AccountData, instance, ProfileData, setUser } from "./store";

export const updateUserProfileData = async (newUserData: ProfileData) => {
	const response = await instance.post('account-settings/edit', JSON.stringify(newUserData));
	if(response.status === 200) {
		setUser(response.data);
	}
	return response;
}
export const updateUserAccountData = async (newUserData: AccountData) => {
	const response = await instance.post('account-settings/edit', JSON.stringify(newUserData));
	if(response.status === 200) {
		setUser(response.data);
	}
	return response;
}