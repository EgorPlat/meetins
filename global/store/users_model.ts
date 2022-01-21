import { createEvent, createStore } from "effector"
import { setIsAsyncLoaded, instance } from "./store";

export const setUsersList = createEvent<IShortUser[]>()
export const $usersList = createStore<IShortUser[]>([] as IShortUser[]).on(
	setUsersList,
	(_, userList) => {
        return userList;
    }
)

export const getAllRegisteredUsers = async () => {
	setIsAsyncLoaded(false);
	const response = await instance.get('peoples/get-all');
    if(response.status === 200) {
        setUsersList(response.data);
    }
	return response;
}
 
export interface IShortUser {
    userId: string,
    firstName: string,
    lastName: string,
    avatarPath: string,
    loginUrl: string
}