"use client";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { $emailForConfirmation, sendConfirmationCodeForAccept } from "@/global/store/register_model";
import ConfirmationView from "@/components/confirmation/ConfirmationPageView/confirmationView";

export default function Confirmation() {

    const emailForConfirmation$ = useUnit($emailForConfirmation);
    const router = useRouter();

    const sendConfirmationCode = (code: number) => {
        sendConfirmationCodeForAccept({ email: emailForConfirmation$, code }).then(res => {
            if (res.status <= 217) {
                router.push(`/profile/${res.data.profile.user.login}`);
            }
        });
    }
    
    return (
        <ConfirmationView sendConfirmationCode={sendConfirmationCode} />
    )
}