import { useTranslation } from "react-i18next";
import { IOuterInviteEvent } from "@/entities/events";
import { baseURL } from "@/global/store/store";
import s from "./OuterInvites.module.scss";
import { Tooltip } from "antd";
import { FaEnvelopeCircleCheck, FaTrash } from "react-icons/fa6";

interface IOuterInviteWrapperProps {
    invites: IOuterInviteEvent[],
    handleWatch: (eventId: number) => void,
    handleVisit: (login: number) => void
}
export default function OuterInvites(props: IOuterInviteWrapperProps) {

    const invites = props.invites;
    const { t } = useTranslation();

    if (invites?.length === 0) {
        return <div className={s.warning}>{t("Вы пока не отправляли приглашений")}.</div>
    }
    if (invites) {
        return (
            <div className={s.list}>
                {
                    invites.map(invite => (
                        <div className={s.wrapper} key={invite.id}>
                            <img src={invite.images[0].image} className={s.image} />
                            <div className={s.info}>
                                <div className={s.title}>{invite.title}</div>
                                <div className={s.persons}>
                                    Вы пригласили {invite.inviteInfo.invitedUsers.length} человек(а)
                                </div>
                            </div>
                            <div className={s.actions}>
                                <Tooltip title="Отменить приглашения">
                                    <FaTrash 
                                        className={s.action} 
                                        fontSize={18}
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