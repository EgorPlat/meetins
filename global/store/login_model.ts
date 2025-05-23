import { instanseRouter } from "./router_model";
import { instance, setUser } from "./store"
import { createEffect, createEvent, createStore, sample } from "effector"


type LoginDetailsType = {
	email: string,
	password: string
} | null

export const sendLogData = createEffect((async (logDetails: LoginDetailsType) => {
    const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(logDetails)
    });
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
    params.router.push("/auth/login");
})

export const saveDataAfterLogin = createEffect(async (params: { router: any, response: any }) => {
    const data = await params.response.json();
    setUser(data.profile.user);
    params.router.push(`/profile/${data.profile.user.login}`);
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
    fn: (routerState, response) => { return { router: routerState.router, response: response } },
    target: saveDataAfterLogin
});

sample({
    source: { router: instanseRouter },
    clock: handleLogOut.doneData,
    filter: (router, response) => response.status <= 201,
    fn: (routerState, response) => { return { router: routerState.router, data: response.data } },
    target: handlePushUserToLoginPage
});