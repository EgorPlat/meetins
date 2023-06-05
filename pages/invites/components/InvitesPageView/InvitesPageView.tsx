import Loader from '../../../../components/Loader/Loader';
import ConfirmAndCancelActions from '../../../../global/helpers/ConfirmAndCancelActions/ConfirmAndCancelActions';
import { customizeDateToYYYYMMDDFormat } from '../../../../global/helpers/helper';
import { User } from '../../../../global/interfaces';
import { IUnitedInvitesEvent } from '../../../../global/interfaces/events';
import { baseURL } from '../../../../global/store/store';
import InnerInviteWrapper from '../InnerInviteWrapper/InnerInviteWrapper';
import OuterInviteWrapper from '../OuterInviteWrapper/OuterInviteWrapper';
import s from './InvitesPageView.module.scss';

interface IInvitesPageView {
    authedUser: User,
    unitedEventsInfo: IUnitedInvitesEvent
}
export default function InvitesPageView({ authedUser, unitedEventsInfo }: IInvitesPageView) {
    if (unitedEventsInfo) {
        return (
            <div className={s.invitesPageView}>
                {
                    unitedEventsInfo.innerInvites.map((invite) => <InnerInviteWrapper invite={invite} />)
                }
                {
                    unitedEventsInfo.outerInvites.map((invite) => <OuterInviteWrapper invite={invite} />)
                }
            </div>
        )
    } else {
        return <span>Загрузка...</span>;
    }
}