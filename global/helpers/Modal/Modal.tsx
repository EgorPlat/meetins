import React, { ReactChild } from "react";
import s from "./Modal.module.scss";

const Modal = (props: {children: ReactChild, isDisplay: boolean}): JSX.Element => {
    return(
        <div>
            { props.isDisplay ? <div className={s.modal}>
            <div className={s.modalContent}>
                <h5>Информация:</h5>
                {props.children}
            </div>
            </div> : null }
        </div>
    )
}

export default Modal;