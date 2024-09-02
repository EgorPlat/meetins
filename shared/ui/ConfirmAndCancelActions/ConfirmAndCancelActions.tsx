import s from "./ConfirmAndCancelActions.module.scss";

export default function ConfirmAndCancelActions(props: {
    confirmButton: boolean,
    cancelButton: boolean,
    infoButton: boolean,
    horizontal: boolean,
    handleWatchButton: () => void
}) {
    return (
        <div className={props.horizontal ? s.horizontal : s.vertical}>
            { props.infoButton && 
                <div className={s.info} onClick={props.handleWatchButton}>
                    Посмотреть
                </div>
            }
            { props.confirmButton && 
                <div className={s.confirm}>
                    Принять
                </div>
            }
            { props.cancelButton && 
                <div className={s.cancel}>
                    Отклонить
                </div>
            }
        </div>
    )
}