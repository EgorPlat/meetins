import { useTranslation } from "react-i18next";
import { IInnerInvites } from "@/entities";
import { IInnerInviteEvent } from "@/entities/events";
import { baseURL } from "@/global/store/store";
import { customizeDateToYYYYMMDDHHMMFormat } from "@/shared/functions/getDateInYYYYMMDDHHFormat";
import s from "./InnerInvites.module.scss";
import { FaEnvelopeCircleCheck, FaTrash } from "react-icons/fa6";
import { Tooltip } from "antd";

interface IInnerInvitesProps {
    invites: IInnerInviteEvent[],
    handleWatch: (eventId: number) => void
    handleDecline: (event: IInnerInvites) => void,
    handleVisit: (login: number) => void
}
export default function InnerInvites(props: IInnerInvitesProps) {

    const invites = props.invites;
    const { t } = useTranslation();

    if (invites?.length === 0) {
        return <div className={s.warning}>{t("У вас пока нет приглашений на мероприятия")}.</div>
    }
    if (invites) {
        return (
            <div className={s.list}>
                {
                    invites.map(invite => (
                        <div className={s.wrapper} key={invite.id}>
                            <img className={s.image} src={invite.images[0].image} />
                            <div className={s.info}>
                                <span className={s.title}>{invite.title}</span>
                                <div className={s.user}>
                                    <img className={s.avatar} src={baseURL + invite.inviteInfo.avatar} />
                                    <span className={s.name} onClick={() => props.handleVisit(invite.inviteInfo.login)}>
                                        {invite.inviteInfo.name} пригласил(а) Ваc
                                        <span className={s.date}>
                                            {` ${customizeDateToYYYYMMDDHHMMFormat(invite.inviteInfo.dateOfSending)}`}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className={s.actions}>
                                <Tooltip title="Принять">
                                    <FaEnvelopeCircleCheck 
                                        className={s.action} 
                                        fontSize={25}
                                    />
                                </Tooltip>
                                <Tooltip title="Удалить">
                                    <FaTrash 
                                        className={s.action} 
                                        fontSize={18}
                                        onClick={() => props.handleDecline(invite.inviteInfo)}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return null;
    }
}