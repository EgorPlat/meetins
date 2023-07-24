import ConfirmAndCancelActions from "../../../../components-ui/ConfirmAndCancelActions/ConfirmAndCancelActions";
import { customizeDateToYYYYMMDDFormat } from "../../../../global/helpers/helper";
import { IInnerInviteEvent } from "../../../../global/interfaces/events";
import { baseURL } from "../../../../global/store/store";
import s from './InnerInviteWrapper.module.scss';

interface IInnerInviteWrapperProps {
    invite: IInnerInviteEvent
}
export default function InnerInviteWrapper(props: IInnerInviteWrapperProps) {
    const invite = props.invite;
    const inviteInfo = invite?.inviteInfo;

    return (
        <div className={s.wrapper} style={{backgroundImage: `url(${invite?.images[0].image})`}}>
            <div className={s.wrapperBlur}>
                <div className={s.wrapperTopContent}>
                    <div className={s.image}>
                        <img 
                            src={baseURL + inviteInfo?.avatar}
                            width="50px"
                            height="50px" 
                        />
                    </div>
                    <div className={s.date}>
                        {customizeDateToYYYYMMDDFormat(inviteInfo?.dateOfSending)}
                    </div>
                </div>
                <div className={s.wrapperMainContent}>
                    <div className={s.title}>
                        Пользователь 
                        <span className={s.name}> {inviteInfo?.name} </span> 
                        пригласил Вас на мероприятие {invite?.short_title}
                    </div>
                    <div className={s.actions}>
                        <ConfirmAndCancelActions 
                            confirmButton={true}
                            cancelButton={true}
                            infoButton={true}
                            horizontal={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}