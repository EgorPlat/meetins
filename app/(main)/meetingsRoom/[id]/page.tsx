"use client"
import { selectedMeeting, uploadFileToMediaMeeting, handleRegInMeeting } from "@/global/store/meetings_model";
import { addNotification } from "@/global/store/notifications_model";
import { $user } from "@/global/store/store";
import { useUnit } from "effector-react";
import { ChangeEvent, useState } from "react";
import MeetingsFilesList from "@/components/meetingsRoom/MeetingFileView/MeetingFileView";
import MeetingsRoomPageView from "@/components/meetingsRoom/MeetingsRoomPageView/MeetingsRoomPageView";
import AddCommentIntoMeeting from "@/features/forms/AddCommentIntoMeeting/Index";
import CustomModal from "@/shared/ui/CustomModal/CustomModal";

export default function MeetingsRoom() {

    const selectedMeeting$ = useUnit(selectedMeeting);
    const [isAddCommentModal, setIsAddCommentModal] = useState<boolean>(false);
    const [isOpenAllFilesModal, setIsOpenAllFilesModal] = useState<boolean>(false);
    const user$ = useUnit($user);
    const isUserInParticipants = selectedMeeting$?.participants.filter(el => el.userId === user$?.userId).length !== 0;

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        uploadFileToMediaMeeting({
            event,
            meetingId: selectedMeeting$.meetingId
        });
    };

    const handleRegInCurrentMeeting = (meetingId: string) => {
        if (!isUserInParticipants) {
            handleRegInMeeting(meetingId);
        } else {
            addNotification({
                text: "Вы уже в списке участников.",
                textColor: "white",
                time: 3000,
                type: "warning",
            })
        }
    };

    const handleAddComment = () => {
        if (isUserInParticipants) {
            setIsAddCommentModal(true);
        } else {
            addNotification({
                text: "Сначала запишитесь на встречу.",
                textColor: "white",
                time: 3000,
                type: "warning",
            })
        }
    };

    const handleOpenAllFiles = () => {
        setIsOpenAllFilesModal(true);
    };

    return (
        <>
            <MeetingsRoomPageView
                selectedMeeting={selectedMeeting$}
                handleFileUpload={handleFileUpload}
                handleAddComment={handleAddComment}
                handleRegInMeeting={handleRegInCurrentMeeting}
                handleOpenAllFiles={handleOpenAllFiles}
                isUserInParticipants={isUserInParticipants}
            />
            <CustomModal
                isDisplay={isAddCommentModal}
                changeModal={setIsAddCommentModal}
                actionConfirmed={setIsAddCommentModal}
                typeOfActions="none"
                title="Добавить комментарий"
            >
                <AddCommentIntoMeeting />
            </CustomModal>
            <CustomModal
                isDisplay={isOpenAllFilesModal}
                changeModal={setIsOpenAllFilesModal}
                actionConfirmed={setIsOpenAllFilesModal}
                typeOfActions="none"
                title="Все медиа файлы со встречи"
            >
                <MeetingsFilesList
                    file={selectedMeeting$?.files[0]}
                />
            </CustomModal>
        </>
    )
}