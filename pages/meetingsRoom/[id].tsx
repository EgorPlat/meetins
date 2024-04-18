import { useRouter } from "next/router";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MeetingsRoomPageView from "./components/MeetingsRoomPageView/MeetingsRoomPageView";
import { useStore } from "effector-react";
import { handleRegInMeeting, selectedMeeting, uploadFileToMediaMeeting } from "../../global/store/meetings_model";
import { ChangeEvent, useState } from "react";
import AddCommentIntoMeeting from "../../global/forms/AddCommentIntoMeeting/Index";
import CustomModal from "../../components-ui/CustomModal/CustomModal";
import { $user, baseURL } from "../../global/store/store";
import { addNotification } from "../../global/store/notifications_model";
import MeetingsFilesList from "./components/MeetingsFilesList/MeetingsFilesList";
import { IGroupFile } from "../../global/interfaces/groups";

export default function MeetingsRoom() {
    
    const router = useRouter();
    const selectedMeeting$ = useStore(selectedMeeting);
    const [isAddCommentModal, setIsAddCommentModal] = useState<boolean>(false);
    const [isOpenAllFilesModal, setIsOpenAllFilesModal] = useState<boolean>(false);
    const user$ = useStore($user);
    const isUserInParticipants = selectedMeeting$?.participants.filter(el => el.userId === user$.userId).length !== 0;

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
                color: 'orange'
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
                color: 'orange'
            })
        }
    };

    const handleOpenAllFiles = () => {
        setIsOpenAllFilesModal(true);
    };

    return (
        <PageContainer>
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
                        files={selectedMeeting$?.files}
                    />
                </CustomModal>
            </>
        </PageContainer>
    )
}