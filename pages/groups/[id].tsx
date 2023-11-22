import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { createNewMessageInGroupTalk, getGroupById, getGroupMembersInfo, groupInfo, groupMembersInfo } from "../../global/store/groups_model";
import { useStore } from "effector-react";
import GroupInfoPageView from "./GroupInfoPageView/GroupInfoPageView";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import { $user } from "../../global/store/store";
import CustomModal from "../../components-ui/CustomModal/CustomModal";
import ManageGroup from "../../global/Forms/ManageGroup/Index";
import AddNewPostIntoGroupForm from "../../global/Forms/AddNewPostIntoGroup/Index";
import GroupTalksMessagesView from "./GroupTalksMessagesView/GroupTalksMessagesView";
import GroupTalks from "./GroupTalks/GroupTalks";
import AddNewTalkInGroup from "../../global/Forms/AddNewTalkInGroup/Index";
import { IGroupTalkMessage } from "../../global/interfaces/groups";
import AddNewMessageIntoGroupTalk from "../../global/Forms/AddNewMessageIntoGroupTalk";
import { AxiosResponse } from "axios";

export default function Groups() {

    const router = useRouter();
    const groupInfo$ = useStore(groupInfo);
    const groupMembersInfo$ = useStore(groupMembersInfo);
    const authedUser$ = useStore($user);
    const isAutherUserCreator = authedUser$?.userId === groupInfo$?.creatorId;
    const [isSettingsGroupOpen, setIsSettingsGroupOppen] = useState<boolean>(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState<boolean>(false);
    const [isAddingPostModalOpen, setIsAddingPostModalOpen] = useState<boolean>(false);
    const [isTalksOpen, setIsTalksOpen] = useState<boolean>(false);
    const [isTalkMessagesOpen, setIsTalkMessagesOpen] = useState<boolean>(false);
    const [isTalkCreationOpen, setIsTalkCreationOpen] = useState<boolean>(false);
    const [selectedTalkId, setSelectedTalkId] = useState<number>();
    const [messageText, setMessageText] = useState<string>("");

    const handleOpenGroupSettings = () => {
        setIsSettingsGroupOppen(true);
    };
    const handleOpenComments = () => {
        setIsCommentsModalOpen(true);
    };
    const handleOpenAddingPost = () => {
        setIsAddingPostModalOpen(true);
    };
    const handleOpenTalks = () => {
        setIsTalksOpen(true);
    };
    const handleOpenTalkMessages = (talkId: number) => {
        setSelectedTalkId(talkId)
        setIsTalksOpen(false);
        setIsTalkMessagesOpen(true);
    };
    const handeOpenTalkCreation = () => {
        setIsTalksOpen(false);
        setIsTalkCreationOpen(true);
    };
    const handleSuccessSubmitTalkCreation = () => {
        setIsTalkCreationOpen(false);
        setIsTalksOpen(true);
    }
    const handleAddNewMessage = (res: AxiosResponse) => {
        
    }

    useEffect(() => {
        if(router.query?.id) {
            getGroupById(+router.query.id);
            getGroupMembersInfo(+router.query.id);
        }
    }, [router.query.id]);
    
    return (
        <PageContainer>
            <div>
                <GroupInfoPageView
                    groupInfo={groupInfo$}
                    isAutherUserCreator={isAutherUserCreator}
                    handleOpenGroupSettings={handleOpenGroupSettings}
                    isSettingsGroupOpen={isSettingsGroupOpen}
                    groupMembersInfo={groupMembersInfo$}
                    handleOpenComments={handleOpenComments}
                    handleOpenAddingPost={handleOpenAddingPost}
                    handleOpenTalks={handleOpenTalks}
                />
                <CustomModal
                    isDisplay={isSettingsGroupOpen}
                    changeModal={setIsSettingsGroupOppen}
                    actionConfirmed={setIsSettingsGroupOppen}
                    typeOfActions="none"
                    title="Управление сообществом"
                >
                    <ManageGroup />
                </CustomModal>
                <CustomModal
                    isDisplay={isCommentsModalOpen}
                    changeModal={setIsCommentsModalOpen}
                    actionConfirmed={setIsCommentsModalOpen}
                    typeOfActions="none"
                    title="Комментарии"
                >
                    Comments
                </CustomModal>
                <CustomModal
                    isDisplay={isAddingPostModalOpen}
                    changeModal={setIsAddingPostModalOpen}
                    actionConfirmed={() => setIsAddingPostModalOpen(false)}
                    typeOfActions="none"
                    title="Добавить публикацию"
                >
                    <AddNewPostIntoGroupForm groupId={String(router.query.id)} />
                </CustomModal>
                <CustomModal
                    isDisplay={isTalksOpen}
                    changeModal={setIsTalksOpen}
                    actionConfirmed={setIsTalksOpen}
                    typeOfActions="none"
                    title="Обсуждения"
                >
                    <GroupTalks
                        handleOpenTalkMessages={handleOpenTalkMessages}
                        handeOpenTalkCreation={handeOpenTalkCreation}
                        groupId={groupInfo$.groupId}
                    />
                </CustomModal>
                <CustomModal
                    isDisplay={isTalkMessagesOpen}
                    changeModal={setIsTalkMessagesOpen}
                    actionConfirmed={setIsTalkMessagesOpen}
                    typeOfActions="custom"
                    actionsComponent={
                        <AddNewMessageIntoGroupTalk
                            groupId={groupInfo$.groupId}
                            talkId={selectedTalkId}
                            onSaveMessage={handleAddNewMessage}
                        />
                    }
                    title="Обсуждение"
                >
                    <GroupTalksMessagesView 
                        talkId={selectedTalkId}
                        groupId={groupInfo$.groupId}
                    />
                </CustomModal>
                <CustomModal
                    isDisplay={isTalkCreationOpen}
                    changeModal={setIsTalkCreationOpen}
                    actionConfirmed={setIsTalkCreationOpen}
                    typeOfActions="none"
                    title="Обсуждение"
                >
                    <AddNewTalkInGroup 
                        groupId={String(router.query.id)}
                        successSubmit={handleSuccessSubmitTalkCreation}
                    />
                </CustomModal>
            </div>
        </PageContainer>
    )
}