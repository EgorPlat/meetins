import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import {
    addActiveGroupTalkMessage,
    getGroupById,
    getGroupMembersInfo,
    groupInfo,
    groupMembersInfo,
    isGroupInfoLoaded,
    likePostInGroup,
    setIsGroupInfoLoaded,
    unlikePostInGroup
} from "../../global/store/groups_model";
import { destrucutreFilesInGroupPost } from "../../shared/helpers/helper";
import { useStore } from "effector-react";
import { $user } from "../../global/store/store";
import { IGroupPost, IGroupTalkMessage } from "../../entities/groups";
import CustomModal from "../../shared/ui/CustomModal/CustomModal";
import CustomLoader from "../../shared/ui/CustomLoader/CustomLoader";
import GroupInfoPageView from "./components/GroupInfoPageView/GroupInfoPageView";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import dynamic from "next/dynamic";
import React from "react";
 
const ManageGroup = dynamic(() => import("../../features/forms/ManageGroup/Index"), { loading: () => <CustomLoader /> });
const GroupCommentsView = dynamic(() => import("./components/GroupCommentsView"), { loading: () => <CustomLoader /> });
const AddNewPostIntoGroupForm = dynamic(() => import("../../features/forms/AddNewPostIntoGroup/Index"), { loading: () => <CustomLoader /> });
const GroupTalks = dynamic(() => import("./components/GroupTalks/GroupTalks"), { loading: () => <CustomLoader /> });
const AddNewMessageIntoGroupTalk = dynamic(() => import("../../features/forms/AddNewMessageIntoGroupTalk"), { loading: () => <CustomLoader /> });
const GroupTalksMessagesView = dynamic(() => import("./components/GroupTalksMessagesView/GroupTalksMessagesView"), { loading: () => <CustomLoader /> });
const AddNewTalkInGroup = dynamic(() => import("../../features/forms/AddNewTalkInGroup/Index"), { loading: () => <CustomLoader /> });
const GroupAttachments = dynamic(() => import("./components/GroupAttachments/GroupAttachments"), { loading: () => <CustomLoader /> });

export default function Groups() {

    const router = useRouter();
    const groupInfo$ = useStore(groupInfo);
    const groupMembersInfo$ = useStore(groupMembersInfo);
    const authedUser$ = useStore($user);
    const isGroupInfoLoaded$ = useStore(isGroupInfoLoaded);
    const isAutherUserCreator = authedUser$?.userId === groupInfo$?.creatorId;
    const [modals, setModals] = useState({
        isSettingsGroupOpen: false,
        isCommentsModalOpen: false,
        isAddingPostModalOpen: false,
        isTalksOpen: false,
        isTalkMessagesOpen: false,
        isTalkCreationOpen: false,
        isPhotosOpen: false,
        isVideosOpen: false
    });
    const [selectedTalkId, setSelectedTalkId] = useState<number>();
    const [activePostId, setActivePostId] = useState<number>();
    const videoPhotoAttachmentsInfo = destrucutreFilesInGroupPost(groupInfo$);

    const handleOpenGroupSettings = () => {
        setModals({
            ...modals,
            isSettingsGroupOpen: true
        });
    };
    const handleOpenComments = (postId: number) => {
        setActivePostId(postId);
        setModals({
            ...modals,
            isCommentsModalOpen: true
        });
    };
    const handleOpenAddingPost = () => {
        setModals({
            ...modals,
            isAddingPostModalOpen: true
        });
    };
    const handleOpenTalks = () => {
        setModals({
            ...modals,
            isTalksOpen: true
        });
    };
    const handleOpenTalkMessages = (talkId: number) => {
        setSelectedTalkId(talkId)
        setModals({
            ...modals,
            isTalkMessagesOpen: true
        });
    };
    const handeOpenTalkCreation = () => {
        setModals({
            ...modals,
            isTalkCreationOpen: true
        });
    };
    const handleSuccessSubmitTalkCreation = () => {
        setModals({
            ...modals,
            isTalkCreationOpen: false,
            isTalksOpen: true
        });
    };
    const handleAddNewMessage = (message: IGroupTalkMessage) => {
        addActiveGroupTalkMessage(message);
    };
    const handleOpenPhotos = () => {
        setModals({
            ...modals,
            isPhotosOpen: true
        });
    };
    const handleOpenVideos = () => {
        setModals({
            ...modals,
            isVideosOpen: true
        });
    };
    const handleLikePost = (post: IGroupPost, groupId: number) => {
        if (post.likes.includes(authedUser$.userId)) {
            unlikePostInGroup({ groupId: groupId, postId: post.id });
        } else {
            likePostInGroup({ groupId: groupId, postId: post.id });
        }
    };
    const handleCloseAddingPostModal = () => {
        setModals({
            ...modals,
            isAddingPostModalOpen: false
        });
    };

    useEffect(() => {
        setIsGroupInfoLoaded(false);
        if (router.query?.id) {
            getGroupById(+router.query.id);
            getGroupMembersInfo(+router.query.id);
        }
    }, [router.query.id]);

    return (
        <PageContainer>
            <>
                {
                    isGroupInfoLoaded$ ?
                        <GroupInfoPageView
                            authedUser={authedUser$}
                            groupInfo={groupInfo$}
                            isAutherUserCreator={isAutherUserCreator}
                            handleOpenGroupSettings={handleOpenGroupSettings}
                            isSettingsGroupOpen={modals.isSettingsGroupOpen}
                            groupMembersInfo={groupMembersInfo$}
                            handleOpenComments={handleOpenComments}
                            handleOpenAddingPost={handleOpenAddingPost}
                            handleOpenTalks={handleOpenTalks}
                            handleOpenPhotos={handleOpenPhotos}
                            handleLikePost={handleLikePost}
                            handleOpenVideos={handleOpenVideos}
                            videoPhotoAttachmentsInfo={videoPhotoAttachmentsInfo}
                        /> :
                        <CustomLoader />
                }
                <CustomModal
                    isDisplay={modals.isSettingsGroupOpen}
                    changeModal={(status) => setModals({ ...modals, isSettingsGroupOpen: status })}
                    actionConfirmed={(status) => setModals({ ...modals, isSettingsGroupOpen: status })}
                    typeOfActions="none"
                    title="Управление сообществом"
                >
                    <ManageGroup />
                </CustomModal>
                <CustomModal
                    isDisplay={modals.isCommentsModalOpen}
                    changeModal={(status) => setModals({ ...modals, isCommentsModalOpen: status })}
                    actionConfirmed={(status) => setModals({ ...modals, isCommentsModalOpen: status })}
                    typeOfActions="none"
                    title="Комментарии"
                >
                    <GroupCommentsView
                        groupInfo={groupInfo$}
                        activePostId={activePostId}
                    />
                </CustomModal>
                <CustomModal
                    isDisplay={modals.isAddingPostModalOpen}
                    changeModal={(status) => setModals({ ...modals, isAddingPostModalOpen: status })}
                    actionConfirmed={(status) => setModals({ ...modals, isAddingPostModalOpen: status })}
                    typeOfActions="none"
                    title="Добавить публикацию"
                >
                    <AddNewPostIntoGroupForm groupId={String(router.query.id)} handleCloseModal={handleCloseAddingPostModal} />
                </CustomModal>
                <CustomModal
                    isDisplay={modals.isTalksOpen}
                    changeModal={(status) => setModals({ ...modals, isTalksOpen: status })}
                    actionConfirmed={(status) => setModals({ ...modals, isTalksOpen: status })}
                    typeOfActions="none"
                    title="Обсуждения"
                >
                    <GroupTalks
                        handleOpenTalkMessages={handleOpenTalkMessages}
                        handeOpenTalkCreation={handeOpenTalkCreation}
                        groupId={groupInfo$.groupId}
                        groupTalks={groupInfo$.talks}
                    />
                </CustomModal>
                <CustomModal
                    isDisplay={modals.isTalkMessagesOpen}
                    changeModal={(status) => setModals({ ...modals, isTalkMessagesOpen: status })}
                    actionConfirmed={(status) => setModals({ ...modals, isTalkMessagesOpen: status })}
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
                    isDisplay={modals.isTalkCreationOpen}
                    changeModal={(status) => setModals({ ...modals, isTalkCreationOpen: status })}
                    actionConfirmed={(status) => setModals({ ...modals, isTalkCreationOpen: status })}
                    typeOfActions="none"
                    title="Создать обсуждение"
                >
                    <AddNewTalkInGroup
                        groupId={String(router.query.id)}
                        successSubmit={handleSuccessSubmitTalkCreation}
                    />
                </CustomModal>
                <CustomModal
                    isDisplay={modals.isPhotosOpen}
                    changeModal={(status) => setModals({ ...modals, isPhotosOpen: status })}
                    actionConfirmed={(status) => setModals({ ...modals, isPhotosOpen: status })}
                    typeOfActions="none"
                    title="Фотографии в сообществе"
                >
                    <GroupAttachments images={videoPhotoAttachmentsInfo.images} />
                </CustomModal>
                <CustomModal
                    isDisplay={modals.isVideosOpen}
                    changeModal={(status) => setModals({ ...modals, isVideosOpen: status })}
                    actionConfirmed={(status) => setModals({ ...modals, isVideosOpen: status })}
                    typeOfActions="none"
                    title="Видео в сообществе"
                >
                    <GroupAttachments videos={videoPhotoAttachmentsInfo.videos} />
                </CustomModal>
            </>
        </PageContainer>
    )
}