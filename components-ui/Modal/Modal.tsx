import React, { ReactChild } from "react";
import s from "./Modal.module.scss";
import { useTranslation } from "react-i18next";

const Modal = (props: {
    children: ReactChild, 
    isDisplay: boolean, 
    changeModal: (status: boolean) => void
    actionConfirmed: (status: boolean) => void
}): JSX.Element | null => {

    const { t } = useTranslation();

    if(!props.isDisplay) {
        return null;
    }
    return(
        <div className={s.modal}>
            <div className={`${s.modalContent} modalContent`}>
                <h5>{t('Информация')}:</h5>
                {props.children}
                <div className={s.manageModal}>
                    <button className={s.confirmBtn} onClick={() => props.actionConfirmed(true)}>{t("Подтвердить")}</button>
                    <button className={s.cancelBtn} onClick={() => props.changeModal(false)}>{t("Закрыть")}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;