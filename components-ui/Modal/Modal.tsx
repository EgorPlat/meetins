import React, { ReactChild } from "react";
import s from "./Modal.module.scss";

const Modal = (props: {
    children: ReactChild, 
    isDisplay: boolean, 
    changeModal: (status: boolean) => void
    actionConfirmed: (status: boolean) => void
}): JSX.Element | null => {

    if(!props.isDisplay) {
        return null;
    }
    return(
        <div className={s.modal}>
            <div className={`${s.modalContent} modalContent`}>
                <h5>Информация:</h5>
                {props.children}
                <div className={s.manageModal}>
                    <button className={s.confirmBtn} onClick={() => props.actionConfirmed(true)}>Подтвердить</button>
                    <button className={s.cancelBtn} onClick={() => props.changeModal(false)}>Закрыть</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;