import { useState } from 'react';
import s from './MyMeetings.module.scss';
import { BsCalendarPlus } from 'react-icons/bs';
import CustomModal from '../../../../../components-ui/CustomModal/CustomModal';
import AddNewMeetingForm from '../../../../../global/forms/AddNewMeeting/Index';
import { IMeeting } from '../../../../../global/interfaces/meetings';
import MeetingWrapper from '../MeetingWrapper/MeetingWrapper';

export default function MyMeetings({
    data,
    handleGoToMeeting
}: {
    data: IMeeting[],
    handleGoToMeeting: (meeting: IMeeting) => void
}) {

    const [isAddModalShown, setIsAddModalShown] = useState<boolean>(false);
    
    return (
        <div className={s.myMeetings}>
            <div className={s.title}>
                Здесь видны встречи, которые запланированны лично Вами.
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
                actionConfirmed={setIsAddModalShown}
                title="Добавление новой встречи"
                typeOfActions="none"
            >
                <AddNewMeetingForm />
            </CustomModal>
        </div>
    )
}