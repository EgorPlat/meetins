"use client";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { $emailForConfirmation, sendConfirmationCodeForAccept } from "@/global/store/register_model";
import { addNotification } from "@/global/store/notifications_model";
import { setUser } from "@/global/store/store";
import ConfirmationView from "@/components/confirmation/ConfirmationPageView/confirmationView";

export default function Confirmation() {

    const emailForConfirmation$ = useUnit($emailForConfirmation);
    const router = useRouter();

    const sendConfirmationCode = (code: number) => {
        sendConfirmationCodeForAccept({ email: emailForConfirmation$, code }).then(async res => {
            const data = await res.json();
            if (data.statusCode <= 217) {
                setUser(data.profile.user);
                router.push(`/profile/${data.profile.user.login}`);
            }
            if (data.statusCode === 400) {
                addNotification({
                    text: "Неверный код",
                    time: 3000,
                    type: "warning",
                    textColor: "black"
                })
            }
        });
    }
    
    return (
        <ConfirmationView sendConfirmationCode={sendConfirmationCode} />
    )
}