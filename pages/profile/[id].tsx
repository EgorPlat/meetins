import Router, { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
    $currentProfileUser,
    $onlineUsers,
    $user,
    addUserIntoMarkedList,
    getDataForProfilePage,
    isCurrentUserLoaded,
    isUserLoaded,
    setCurrentProfileUser,
    setIsCurrentUserLoaded,
    setUser
} from "../../global/store/store";
import { useUnit } from "effector-react";
import { updateUserAvatar, updateUserStatus } from "../../global/store/settings_model";
import { checkDialog } from "../../global/store/chat_model";
import { sendInviteToUser } from "../../global/store/events_model";
import { User } from "../../entities";
import { addNotification } from "../../global/store/notifications_model";
import { currentUserPlaces$, getUserPlaces } from "../../global/store/meetings_model";
import CustomLoader from "../../shared/ui/CustomLoader/CustomLoader";
import ProfileView from "./components/ProfileView/profileView";
import PageContainer from "../../widgets/PageContainer/pageContainer";

function Profile(): JSX.Element {

    const route = useRouter();
    const userLoaded = useUnit(isUserLoaded);
    const currentUserLoaded = useUnit(isCurrentUserLoaded);
    const currentUser = useUnit($currentProfileUser);
    const authedUser = useUnit($user);
    const currentUserPlaces = useUnit(currentUserPlaces$);
    const onlineUsers = useUnit($onlineUsers);

    const [addingImageStatus, setAddingImageStatus] = useState<boolean>(false);
    const [isAddPostModal, setIsAddPostModal] = useState<boolean>(false);
    const [isInviteModal, setIsInviteModal] = useState<boolean>(false);
    const [choosedEventForInvite, setChoosedEventForInvite] = useState<number>();
    const [isEditTagOpen, setIsEditTagOpen] = useState<boolean>(false);
    const [newAvatarForCrop, setNewAvatarForCrop] = useState<string>(null);
    
    const isCurrentUserOnline = onlineUsers.filter(el => el.userId === currentUser.userId).length !== 0;

    const changeAddingImageStatus = (status: boolean) => {
        if (currentUser.login === authedUser?.login) {
            setAddingImageStatus(() => status);
        }
    };

    const onChangeInputImage = (event: ChangeEvent<HTMLInputElement>) => {
        const imgForCrop = URL.createObjectURL(event.target.files[0]);
        setNewAvatarForCrop(imgForCrop);
    };

    const handleGetCroppedAvatar = (blob: Blob) => {
        updateUserAvatar(blob).then((res: User) => {
            setCurrentProfileUser(res)
            setUser(res);
        })
        setNewAvatarForCrop(null);
    };

    const handleSaveNewStatus = (userStatus: string) => {
        updateUserStatus(userStatus).then((user: User) => {
            setUser(user);
            setCurrentProfileUser(user);
        });
    };

    const handleStartDialog = () => {
        checkDialog(currentUser);
        Router.push("/messanger")
    };

    const onAddingModalClick = () => {
        setIsAddPostModal(false);
    };

    const handleSendInvite = () => {
        sendInviteToUser({ userToId: currentUser.userId, eventId: choosedEventForInvite });
        setIsInviteModal(false);
    };

    const handleAddUserIntoMarked = () => {
        if (authedUser.markedUsers.includes(currentUser.userId)) {
            addNotification({
                textColor: "white",
                type: "warning",
                time: 3000,
                text: "Уже в избранных."
            })
        } else {
            addUserIntoMarkedList(currentUser.userId);
        }
    };

    const handleSwapEditTag = (status: boolean) => {
        if (authedUser.userId === currentUser.userId) setIsEditTagOpen(status);
    };

    useEffect(() => {
        return () => {
            setIsCurrentUserLoaded(false);
            setCurrentProfileUser({} as User);
        }
    }, []);

    useEffect(() => {
        if (!route.isReady) return;
        getDataForProfilePage(String(route.query.id));
    }, [route.isReady, route.asPath]);

    useEffect(() => {
        if (currentUser.userId) {
            getUserPlaces({ userId: currentUser.userId });
        }
    }, [currentUser.userId]);

    if (currentUserLoaded) {
        return (
            <PageContainer>
                <ProfileView
                    asyncLoaded={userLoaded}
                    addingImageStatus={addingImageStatus}
                    currentUser={currentUser}
                    authedUser={authedUser}
                    isAddPostModal={isAddPostModal}
                    isInviteModal={isInviteModal}
                    isEditTagOpen={isEditTagOpen}
                    handleSendInvite={handleSendInvite}
                    setChoosedEventForInvite={setChoosedEventForInvite}
                    setIsAddPostModal={setIsAddPostModal}
                    setIsInviteModal={setIsInviteModal}
                    handleSwapEditTag={handleSwapEditTag}
                    handleStartDialog={handleStartDialog}
                    onChangeInputImage={onChangeInputImage}
                    handleSaveNewStatus={handleSaveNewStatus}
                    changeAddingImageStatus={changeAddingImageStatus}
                    onAddingModalClick={onAddingModalClick}
                    handleAddUserIntoMarked={handleAddUserIntoMarked}
                    handleGetCroppedAvatar={handleGetCroppedAvatar}
                    setNewAvatarForCrop={setNewAvatarForCrop}
                    currentUserPlaces={currentUserPlaces}
                    isCurrentUserOnline={isCurrentUserOnline}
                    newAvatarForCrop={newAvatarForCrop}
                />
            </PageContainer>
        )
    } else {
        return (
            <CustomLoader />
        )
    }
}

export default Profile;