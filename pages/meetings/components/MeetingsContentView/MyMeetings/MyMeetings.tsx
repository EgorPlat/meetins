import { useState } from 'react';
import s from './MyMeetings.module.scss';
import { BsCalendarPlus } from 'react-icons/bs';
import CustomModal from '../../../../../components-ui/CustomModal/CustomModal';
import AddNewMeetingForm from '../../../../../global/Forms/AddNewMeeting/Index';

export default function MyMeetings() {

    const [isAddModalShown, setIsAddModalShown] = useState<boolean>(false);
    return (
        <div className={s.myMeetings}>
            <div className={s.title}>
                Здесь будут видны встречи, когда-либо запланированные Вами.
                <BsCalendarPlus 
                    style={{ cursor: "pointer" }}
                    fontSize={24}
                    onClick={() => setIsAddModalShown(true)}
                />
            </div>
            {
                isAddModalShown &&
                <CustomModal
                    isDisplay={isAddModalShown}
                    changeModal={setIsAddModalShown}
                    actionConfirmed={setIsAddModalShown}
                    title="Добавление новой встречи"
                    typeOfActions="none"
                >
                    <AddNewMeetingForm />
                </CustomModal>
            }
        </div>
    )
}