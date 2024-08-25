import { instance, setUser } from "./store"
import { createEffect, createEvent, createStore, sample } from "effector"

type RegisterDetailsType = {
	name: string
	email: string | null
	password: string
	gender: string
	city: string
} | null
type ConfirmationData = {
	email: string,
	code: number
}

export const setRegisterDetails = createEvent<RegisterDetailsType>()
export const $registerDetails = createStore<RegisterDetailsType>(null).on(
    setRegisterDetails,
    (_, newRegDetails) => {
        return newRegDetails
    }
)
export const setEmailForConfirmation = createEvent<string>()
export const $emailForConfirmation = createStore<string>("").on(
    setEmailForConfirmation,
    (_, newEmail) => {
        return newEmail
    }
)

export const sendRegData = createEffect(async (regDetails: RegisterDetailsType) => {
    const response = await instance.post("auth/registrationWithConfirmation", regDetails)
    return response;
})
export const sendConfirmationCodeForAccept = createEffect(async (confirmationData: ConfirmationData) => {
    const response = await instance.post("auth/acceptUserAccount", {
        email: confirmationData.email,
        code: +confirmationData.code
    })
    return response;
})

const saveDataAfterRegsiter = createEffect((data: any) => {
    setUser(data.profile.user);
})

sample({
    clock: sendConfirmationCodeForAccept.doneData,
    filter: response => response.status <= 217,
    fn: response => response.data,
    target: saveDataAfterRegsiter
})