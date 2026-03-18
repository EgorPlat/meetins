import { useUnit } from "effector-react";
import React, { JSX } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import s from "./About.module.scss";
import { TbInfoSquareFilled } from "react-icons/tb";
import { User } from "@/entities";
import { $user } from "@/global/store/store";
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
import CustomInput from "@/shared/ui/CustomInput/CustomInput";
import { MdCancel } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

export default React.memo(function About(props: {
    user: User,
    saveNewUserStatus: (userStatus: string) => void
}): JSX.Element {

    const { t } = useTranslation();
    const [changingStatus, setChangingStatus] = useState<boolean>(false);
    const [userStatus, setUserStatus] = useState<string>(props.user?.status);
    const authedUser = useUnit($user);
    const isAuthedProfile = props.user?.login === authedUser?.login;

    const newChangeSatus = (status: boolean) => {
        if (isAuthedProfile) {
            setChangingStatus(() => status);
        }
    };
    
    const saveNewStatus = async () => {
        props.saveNewUserStatus(userStatus);
        newChangeSatus(false);
    };

    if (props.user && authedUser) {
        return (
            <div className={s.about}>
                <div className={s.title}>
                    <b>{t("О себе")}</b>
                    {isAuthedProfile && <span onClick={() => newChangeSatus(true)} className={s.changeSpan}>{t("Изменить")}</span>}
                </div>
                <CustomInput 
                    className={s.textChange}
                    bordered={changingStatus}
                    placeholder={
                        isAuthedProfile && authedUser.status === null || authedUser.status === "" 
                        ? t("Введите ваш статус") 
                        : t("Введите текст")
                    }
                    defaultValue={props.user.status}
                    onChange={(event) => setUserStatus(event.target.value)}
                    postFix={
                        changingStatus && (
                            <>
                                <FaCircleCheck fontSize={20} onClick={saveNewStatus} />
                                <MdCancel fontSize={24} onClick={() => newChangeSatus(false)} />
                            </>
                        )
                    }
                />
            </div>
        )
    } else {
        return (
            <div>Ошибка. Пожалуйста, обновите страницу.</div>
        )
    }
})