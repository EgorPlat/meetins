import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { getGroupById, getGroupMembersInfo, groupInfo, groupMembersInfo } from "../../global/store/groups_model";
import { useStore } from "effector-react";
import GroupInfoPageView from "./GroupInfoPageView/GroupInfoPageView";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import { $user } from "../../global/store/store";
import CustomModal from "../../components-ui/CustomModal/CustomModal";
import ManageGroup from "../../global/Forms/ManageGroup/Index";
import AddNewPostIntoGroupForm from "../../global/Forms/AddNewPostIntoGroup/Index";
import GroupTalks from "./GroupTalks/GroupTalks";

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

    useEffect(() => {
        getGroupById(+router.query.id);
        getGroupMembersInfo(+router.query.id);
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
                    <GroupTalks />
                </CustomModal>
            </div>
        </PageContainer>
    )
}