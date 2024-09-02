import dynamic from "next/dynamic";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";
import CustomStepper from "../../../../shared/ui/CustomStepper/CustomStepper";
import { IInnerInvites, User } from "../../../../entities";
import { IUnitedInvitesEvent } from "../../../../entities/events";

const InnerInvites = dynamic(() => import("../InnerInvites/InnerInvites"), { loading: () => <CustomLoader /> });
const OuterInvites = dynamic(() => import("../OuterInvites/OuterInvites"), { loading: () => <CustomLoader /> });
import s from "./InvitesPageView.module.scss";

interface IInvitesPageView {
    authedUser: User,
    unitedEventsInfo: IUnitedInvitesEvent,
    loadedStatus: boolean,
    handleWatch: (eventId: number) => void,
    handleDecline: (event: IInnerInvites) => void,
    handleVisit: (login: number) => void
}
export default function InvitesPageView({
    authedUser,
    handleWatch,
    loadedStatus,
    unitedEventsInfo,
    handleDecline,
    handleVisit
}: IInvitesPageView) {

    if (!loadedStatus) {
        return (
            <CustomLoader />
        )
    }
    else if (loadedStatus) {
        return (
            <div className={s.content}>
                <CustomStepper
                    steps={[
                        {
                            title: "Входящие приглашения", component: InnerInvites, props: {
                                invites: unitedEventsInfo.innerInvites,
                                handleDecline: handleDecline,
                                handleWatch: handleWatch,
                                handleVisit: handleVisit
                            }
                        },
                        {
                            title: "Исходящие приглашения", component: OuterInvites, props: {
                                invites: unitedEventsInfo.outerInvites,
                                handleWatch: handleWatch,
                                handleVisit: handleVisit
                            }
                        }
                    ]}
                />
            </div>
        )
    }
    else {
        return <CustomLoader />
    }
}