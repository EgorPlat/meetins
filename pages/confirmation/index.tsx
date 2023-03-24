import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { addNewError } from "../../global/store/errors_model";
import { $emailForConfirmation, sendConfirmationCodeForAccept } from "../../global/store/register_model";
import ConfirmationView from "./components/confirmationView";

export default function Confirmation() {

    const emailForConfirmation$ = useStore($emailForConfirmation);
    const router = useRouter();

    const sendConfirmationCode = (code: number) => {
        sendConfirmationCodeForAccept({ email: emailForConfirmation$, code }).then(res => {
            if (res.status <= 217) {
                router.push(`/profile/${res.data.profile.user.login}`);
            } else {
                addNewError({ text: "Неверный код", time: 3000, color: "orange" });
            }
        });
    }
    return (
        <ConfirmationView sendConfirmationCode={sendConfirmationCode} />
    )
}