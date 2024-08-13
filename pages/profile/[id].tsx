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
import { useStore } from "effector-react";
import { updateUserAvatar, updateUserStatus } from "../../global/store/settings_model";
import { checkDialog } from "../../global/store/chat_model";
import { sendInviteToUser } from "../../global/store/events_model";
import { User } from "../../global/interfaces";
import { addNotification } from "../../global/store/notifications_model";
import { currentUserPlaces$, getUserPlaces } from "../../global/store/meetings_model";
import CustomLoader from "../../components-ui/CustomLoader/CustomLoader";
import ProfileView from "./ProfileView/profileView";
import PageContainer from "../../global/components/PageContainer/pageContainer";

function Profile(): JSX.Element {

    const route = useRouter();
    const userLoaded = useStore(isUserLoaded);
    const currentUserLoaded = useStore(isCurrentUserLoaded);
    const currentUser = useStore($currentProfileUser);
    const authedUser = useStore($user);
    const currentUserPlaces = useStore(currentUserPlaces$);
    const onlineUsers = useStore($onlineUsers);

    const [addingImageStatus, setAddingImageStatus] = useState<boolean>(false);
    const [isAddPostModal, setIsAddPostModal] = useState<boolean>(false);
    const [isInviteModal, setIsInviteModal] = useState<boolean>(false);
    const [choosedEventForInvite, setChoosedEventForInvite] = useState<number>();
    const [isEditTagOpen, setIsEditTagOpen] = useState<boolean>(false);

    const isCurrentUserOnline = onlineUsers.filter(el => el.userId === currentUser.userId).length !== 0;

    const changeAddingImageStatus = (status: boolean) => {
        if (currentUser.login === authedUser?.login) {
            setAddingImageStatus(() => status);
        }
    };

    const onChangeInputImage = (event: ChangeEvent<HTMLInputElement>) => {
        updateUserAvatar(event).then((res: User) => {
            setCurrentProfileUser(res)
            setUser(res);
        })
    };

    const handleSaveNewStatus = (userStatus: string) => {
        updateUserStatus(userStatus).then((user: User) => {
            setUser(user);
            setCurrentProfileUser(user);
        });
    };

    const handleStartDialog = () => {
        checkDialog(currentUser);
        Router.push('/messanger')
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
                color: "orange",
                time: 3000,
                text: "Уже в избранных."
            })
        } else {
            addUserIntoMarkedList(currentUser.userId);
        }
    };

    const handleSwapEditTag = (status: boolean) => {
        if (authedUser.userId === currentUser.userId) setIsEditTagOpen(status);
    }

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
                    currentUserPlaces={currentUserPlaces}
                    isCurrentUserOnline={isCurrentUserOnline}
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