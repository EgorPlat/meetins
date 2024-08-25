import { instanseRouter } from "./router_model";
import { instance, setUser } from "./store"
import { attach, createEffect, createEvent, createStore, sample } from "effector"


type LoginDetailsType = {
	email: string,
	password: string
} | null

export const sendLogData = createEffect((async (logDetails: LoginDetailsType) => {
    const response = await instance.post("auth/login", logDetails);
    return response;
}));
export const handleLogOut = createEffect((async () => {
    const response = await instance.get("auth/logout")
    return response;
}));

export const setLoginDetails = createEvent<LoginDetailsType>()
export const $loginDetails = createStore<LoginDetailsType>(null).on(
    setLoginDetails,
    (_, newLogDetails) => {
        return newLogDetails
    }
)
export const setLoginLoading = createEvent<boolean>()
export const $loginLoading = createStore<boolean>(false).on(
    setLoginLoading,
    (_, status) => {
        return status
    }
)

export const handlePushUserToLoginPage = createEffect((params: { router: any, data: any }) => {
    params.router.push("/login");
})

export const saveDataAfterLogin = createEffect((params: { router: any, data: any }) => {
    setUser(params.data.profile.user);
    params.router.push(`profile/${params.data.profile.user.login}`);
});

sample({
    clock: sendLogData.pending,
    fn: () => true,
    target: setLoginLoading
});

sample({
    clock: sendLogData.doneData,
    fn: () => false,
    target: setLoginLoading
});

sample({
    source: { router: instanseRouter },
    clock: sendLogData.doneData,
    filter: (router, response) => response.status <= 201,
    fn: (routerState, response) => { return { router: routerState.router, data: response.data } },
    target: saveDataAfterLogin
});

sample({
    source: { router: instanseRouter },
    clock: handleLogOut.doneData,
    filter: (router, response) => response.status <= 201,
    fn: (routerState, response) => { return { router: routerState.router, data: response.data } },
    target: handlePushUserToLoginPage
});