"use client";
import React, { JSX, ReactNode } from "react";
import s from "./CustomModal.module.scss";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

const CustomModal = (props: {
    children: ReactNode, 
    isDisplay: boolean, 
    changeModal: (status: boolean) => void
    actionConfirmed: (status: boolean) => void,
    title: string,
    typeOfActions: "default" | "none" | "custom"
    actionsComponent?: any,
}): JSX.Element | null => {

    const { t } = useTranslation();

    if(!props.isDisplay) {
        return null;
    }
    return (
        <div className={s.customModal}>
            <div className={`${s.customModalContent} customModal`}>
                <div className={s.customModalTitle}>
                    <div>{t(props.title)}</div>
                    <div className={s.customModalClose} onClick={() => props.changeModal(false)}>
                        x
                    </div>
                </div>
                <div className={s.customModalChildrenContent}>
                    {props.children}
                </div>
                <div className={s.manageCustomModal}>
                    { 
                        props.typeOfActions === "default" 
                        &&
                        <>
                            <button className={s.confirmBtn} onClick={() => props.actionConfirmed(true)}>{t("Подтвердить")}</button>
                            <button className={s.cancelBtn} onClick={() => props.changeModal(false)}>{t("Закрыть")}</button>
                        </>
                    }
                    {
                        props.typeOfActions === "custom"
                        &&
                        {...props.actionsComponent}
                    }
                    {
                        props.typeOfActions === "none"
                        &&
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default CustomModal;