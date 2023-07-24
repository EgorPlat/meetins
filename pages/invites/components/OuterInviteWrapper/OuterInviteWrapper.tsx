import ConfirmAndCancelActions from "../../../../components/ConfirmAndCancelActions/ConfirmAndCancelActions";
import { customizeDateToYYYYMMDDFormat } from "../../../../global/helpers/helper";
import { IOuterInviteEvent } from "../../../../global/interfaces/events";
import { baseURL } from "../../../../global/store/store";
import s from './OuterInviteWrapper.module.scss';

interface IOuterInviteWrapperProps {
    invite: IOuterInviteEvent
}
export default function OuterInviteWrapper(props: IOuterInviteWrapperProps) {
    const invite = props.invite;
    const inviteInfo = invite?.inviteInfo;

    return (
        <div className={s.wrapper} style={{backgroundImage: `url(${invite?.images[0].image})`}}>
            <div className={s.wrapperBlur}>
                
            </div>
        </div>
    )
}