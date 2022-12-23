import React, { ReactChild } from "react";
import s from "./CustomModal.module.scss";

const CustomModal = (props: {
    children: ReactChild, 
    isDisplay: boolean, 
    changeModal: (status: boolean) => void
    actionConfirmed: (status: boolean) => void,
    title: string,
}): JSX.Element | null => {

    if(!props.isDisplay) {
        return null;
    }
    return(
        <div className={s.customModal}>
            <div className={s.customModalContent}>
                <div className={s.cistomModalTitle}>{props.title}</div>
                <div className={s.customModalChildrenContent}>
                    {props.children}
                </div>
                <div className={s.manageCustomModal}>
                    <button className={s.confirmBtn} onClick={() => props.actionConfirmed(true)}>Подтвердить</button>
                    <button className={s.cancelBtn} onClick={() => props.changeModal(false)}>Закрыть</button>
                </div>
            </div>
        </div>
    )
}

export default CustomModal;