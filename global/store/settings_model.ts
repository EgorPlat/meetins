import { createEffect, createEvent, createStore } from "effector";
import { AccountData, ProfileData, User } from "../../entities";
import { instance, setUser } from "./store";

export const setIsProfileUpdated = createEvent<boolean | null>();
export const isProfileUpdated = createStore<boolean | null>(null).on(setIsProfileUpdated, (_, profileUpdated) => {
    return profileUpdated;
})
export const updateUserProfileData = async (newUserData: ProfileData) => {
    setIsProfileUpdated(null);
    const response = await instance.post("settings/update-profile", JSON.stringify(newUserData));
    if (response.status === 200) {
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
    setIsAccountUpdated(null);
    const response = await instance.post("settings/update-account", JSON.stringify(newUserData));
    if (response.status === 200) {
        setUser(response.data);
        setIsAccountUpdated(true);
    }
    return response;
}
export const deleteUserAccount = async () => {
    const response = await instance.delete("/user/delete-user");
    return response;
}
export const updateUserAvatar = createEffect(async (blob: Blob) => {
    const formData = new FormData();
    const image = new File([blob], "image.jpeg", { type: "image/jpeg" });
    
    formData.append("uploadedFile", image);

    const response = await instance.post<User>("/settings/update-avatar", formData);
    if (response.status <= 200) {
        return response.data;
    }
});

export const updateUserStatus = createEffect(async (userStatus: string) => {
    const response = await instance.post<User>("settings/update-status", { status: userStatus });
    if (response.status === 200) {
        return response.data;
    }
});

export const updateUserFilterStatus = createEffect(async (userFilterStatus: boolean) => {
    const response = await instance.post<User>("settings/update-filter-status", { isFilter: userFilterStatus });
    if (response.status === 200) {
        return response.data;
    }
});