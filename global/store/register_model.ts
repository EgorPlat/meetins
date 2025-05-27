import { createEffect, createEvent, createStore } from "effector"

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
    const response = fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(regDetails)
    });
    return response;
})
export const sendConfirmationCodeForAccept = createEffect(async (confirmationData: ConfirmationData) => {
    const response = await fetch("/api/auth/confirmation", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(confirmationData)
    });
    return response;
})