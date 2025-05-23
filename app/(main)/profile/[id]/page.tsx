"use client";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, JSX, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { $currentProfileUser, $onlineUsers, $user, addUserIntoMarkedList, getDataForProfilePage, isCurrentUserLoaded, isUserLoaded, setCurrentProfileUser, setIsCurrentUserLoaded, setUser } from "@/global/store/store";
import { currentUserPlaces$, getUserPlaces } from "@/global/store/meetings_model";
import { User } from "@/entities";
import { updateUserAvatar, updateUserStatus } from "@/global/store/settings_model";
import { checkDialog } from "@/global/store/chat_model";
import { sendInviteToUser } from "@/global/store/events_model";
import { addNotification } from "@/global/store/notifications_model";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import ProfileView from "@/components/profile/ProfileView/profileView";


function Profile(): JSX.Element {

    const params = useParams();
    const router = useRouter();
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
    const [newAvatarForCrop, setNewAvatarForCrop] = useState<string | null>(null);
    
    const isCurrentUserOnline = onlineUsers.filter(el => el.userId === currentUser.userId).length !== 0;

    const changeAddingImageStatus = (status: boolean) => {
        if (currentUser.login === authedUser?.login) {
            setAddingImageStatus(() => status);
        }
    };

    const onChangeInputImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const imgForCrop = URL.createObjectURL(event.target.files[0]);
            setNewAvatarForCrop(imgForCrop);
        }
    };

    const handleGetCroppedAvatar = (blob: Blob) => {
        updateUserAvatar(blob).then((res: any) => {
            setCurrentProfileUser(res)
            setUser(res);
        })
        setNewAvatarForCrop(null);
    };

    const handleSaveNewStatus = (userStatus: string) => {
        updateUserStatus(userStatus).then((user: any) => {
            setUser(user);
            setCurrentProfileUser(user);
        });
    };

    const handleStartDialog = () => {
        checkDialog(currentUser);
        router.push("/messanger");
    };

    const onAddingModalClick = () => {
        setIsAddPostModal(false);
    };

    const handleSendInvite = () => {
        sendInviteToUser({ 
            userToId: currentUser.userId, 
            eventId: String(choosedEventForInvite)
        });
        setIsInviteModal(false);
    };

    const handleAddUserIntoMarked = () => {
        if (authedUser?.markedUsers.includes(currentUser.userId)) {
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
        if (authedUser?.userId === currentUser.userId) setIsEditTagOpen(status);
    };

    const handleShowUserStatistic = () => {
        addNotification({ textColor: "white", type: "info", time: 3000, text: "Статистика пока не сформирована" });
    };

    const handleRemoveNotifyFromUser = () => {
        addNotification({ 
            textColor: "white", 
            type: "info", 
            time: 3000, 
            text: "В скором времени Вы не будете видеть активность этого пользователя" 
        });
    };

    useEffect(() => {
        return () => {
            setIsCurrentUserLoaded(false);
            setCurrentProfileUser({} as User);
        }
    }, []);

    useEffect(() => {
        if (params.id) {
            console.log(params.id)
            getDataForProfilePage(String(params.id));
        }
    }, [params.id]);

    useEffect(() => {
        if (currentUser.userId) {
            getUserPlaces({ userId: currentUser.userId });
        }
    }, [currentUser.userId]);

    if (currentUserLoaded && authedUser) {
        return (
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
                handleRemoveNotifyFromUser={handleRemoveNotifyFromUser}
                handleShowUserStatistic={handleShowUserStatistic}
                currentUserPlaces={currentUserPlaces}
                isCurrentUserOnline={isCurrentUserOnline}
                newAvatarForCrop={newAvatarForCrop}
            />
        )
    } else {
        return (
            <CustomLoader />
        )
    }
}

export default Profile;