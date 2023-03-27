import React, { ReactChild, ReactComponentElement } from "react";
import s from "./CustomModal.module.scss";

const CustomModal = (props: {
    children: ReactChild, 
    isDisplay: boolean, 
    changeModal: (status: boolean) => void
    actionConfirmed: (status: boolean) => void,
    title: string,
    typeOfActions: string,
    actionsComponent?: any,
}): JSX.Element | null => {

    if(!props.isDisplay) {
        return null;
    }
    return(
        <div className={s.customModal}>
            <div className={s.customModalContent}>
                <div className={s.customModalTitle}>
                    {props.title}
                    <div className={s.customModalClose}>
                        <button onClick={() => props.changeModal(false)}>x</button>
                    </div>
                </div>
                <div className={s.customModalChildrenContent}>
                    {props.children}
                </div>
                <div className={s.manageCustomModal}>
                    { 
                        props.typeOfActions === 'default' 
                        &&
                        <>
                            <button className={s.confirmBtn} onClick={() => props.actionConfirmed(true)}>Подтвердить</button>
                            <button className={s.cancelBtn} onClick={() => props.changeModal(false)}>Закрыть</button>
                        </>
                    }
                    {
                        props.typeOfActions === 'custom'
                        &&
                        {...props.actionsComponent}
                    }
                    {
                        props.typeOfActions === 'none'
                        &&
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default CustomModal;