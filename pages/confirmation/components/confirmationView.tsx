import { useRef } from 'react';
import Image from 'next/image';
import logo from '../../../public/images/logo.svg';
import s from './confirmation.module.scss';
import Link from 'next/link';

interface IConfirmationViewProps {
    sendConfirmationCode: (code: number) => void
}
export default function ConfirmationView({ sendConfirmationCode }: IConfirmationViewProps) {

    const ref = useRef(null);

    return (
        <div className={s.confirmation}>
            <div className={s.description}>
                Пожалуйста, для успешной процедуры подтверждения не перезагружайте страницу.
                На указанную Вами при регистрации почту был выслан код подтверждения.
                Пожалуйста впишите его в поле и нажмите "Отправить"
            </div>
            <div className={s.title}>
                <Image src={logo} width="50px" height="50px" />
            </div>
            <div className={s.content}>
                <input type="number" placeholder="Введите код" ref={ref} />
            </div>
            <div className={s.actions}>
                <button onClick={() => sendConfirmationCode(ref.current.value)}>Отправить</button>
                <Link href="/login" className={s.goBack}>Вернуться назад</Link>
            </div>
        </div>
    )
}