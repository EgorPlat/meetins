import { useState } from "react";
import s from "./MyMeetings.module.scss";
import { BsCalendarPlus } from "react-icons/bs";
import CustomModal from "../../../../../shared/ui/CustomModal/CustomModal";
import AddNewMeetingForm from "../../../../../features/forms/AddNewMeeting/Index";
import { IMeeting } from "../../../../../entities/meetings";
import MeetingWrapper from "../MeetingWrapper/MeetingWrapper";
import { useTranslation } from "react-i18next";

export default function MyMeetings({
    data,
    handleGoToMeeting
}: {
    data: IMeeting[],
    handleGoToMeeting: (meeting: IMeeting) => void
}) {

    const [isAddModalShown, setIsAddModalShown] = useState<boolean>(false);
    const { t } = useTranslation();

    return (
        <div className={s.myMeetings}>
            <div className={s.title}>
                {t("Здесь видны встречи, которые запланированны лично Вами")}
                <BsCalendarPlus
                    style={{ cursor: "pointer" }}
                    fontSize={24}
                    onClick={() => setIsAddModalShown(true)}
                />
            </div>
            <div className={s.meetingsList}>
                {
                    data?.map(el => (
                        <MeetingWrapper
                            key={el.address}
                            meeting={el}
                            handleGoToMeeting={handleGoToMeeting}
                        />
                    ))
                }
            </div>
            <CustomModal
                isDisplay={isAddModalShown}
                changeModal={setIsAddModalShown}
                actionConfirmed={() => setIsAddModalShown(false)}
                title="Добавление новой встречи"
                typeOfActions="none"
            >
                <AddNewMeetingForm />
            </CustomModal>
        </div>
    )
}