import { AiOutlineMenu } from 'react-icons/ai';
import { SlLogout } from 'react-icons/sl';
import s from './MobileLeftNavMenu.module.scss';
import { useEffect, useState } from 'react';
import { BsEnvelope } from 'react-icons/bs';
import { useStore } from 'effector-react';
import { isUserUnReadMessagesExists } from '../../store/chat_model';

export const MobileLeftNavMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const completedClass = isOpen ? s.startAnimation : '';
    const unredMessages = useStore(isUserUnReadMessagesExists);

    const handleOpenMenu = (status: boolean) => {
        setIsOpen(status);
    }
    return (
        <div className={`${s.mobileLeftNavMenu} ${completedClass}`} >
            <div className={s.title}>Меню</div>
            <div className={s.btn}>
                <AiOutlineMenu fontSize={30} onClick={() => handleOpenMenu(!isOpen)} />
            </div>
            {
                isOpen &&
                <div className={s.list}>
                    <div className={s.item}>Мессенджер<BsEnvelope color={isUserUnReadMessagesExists ? '#3d81ff' : 'gray'} /></div>
                    <div className={s.item}>Приглашения</div>
                    <div className={s.item}>Музыка</div>
                    <div className={s.item}>Закладки</div>
                </div>
            }
        </div>
    )
}