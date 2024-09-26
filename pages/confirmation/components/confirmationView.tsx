import { useRef, useState } from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import s from "./confirmation.module.scss";
import Link from "next/link";
import CustomSplitedInput from "../../../shared/ui/CustomSplitedInput/CustomSplitedInput";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
import CustomButtonWithHint from "../../../shared/ui/CustomButtonWithHint/CustomButtonWithHint";

interface IConfirmationViewProps {
    sendConfirmationCode: (code: number) => void
}
export default function ConfirmationView({ sendConfirmationCode }: IConfirmationViewProps) {

    const [code, setCode] = useState<number>(0);

    return (
        <div className={s.confirmation}>
            <div className={s.title}>
                <Image src={logo} width="50" height="50" alt="Logo" />
            </div>
            <div className={s.description}>
                Пожалуйста, для успешной процедуры подтверждения не перезагружайте страницу.
                На указанную Вами при регистрации почту был выслан код подтверждения.
                Пожалуйста впишите его в поле и нажмите "Отправить"
            </div>
            <CustomButtonWithHint
                title="Не получили код ?"
                fontSize={16}
                hintTitle="Если Вы не получили код, пожалуйста, проверьте папку спам или убедитесь, что Ваш почтовый ящик не переполнен."
            />
            <div className={s.content}>
                <CustomSplitedInput count={6} handleChangeValue={value => setCode(+value)} />
            </div>

            <div className={s.actions}>
                <CustomButton text="Отправить" onClick={() => sendConfirmationCode(code)} />
                <Link href="/login" className={s.goBack}>Вернуться назад</Link>
            </div>
        </div>
    )
}