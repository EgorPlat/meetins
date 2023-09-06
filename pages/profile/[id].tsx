import Router, { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { $currentProfileUser, $user, getDataForProfilePage, isCurrentUserLoaded, isUserLoaded, setCurrentProfileUser, setUser } from "../../global/store/store";
import { useStore } from "effector-react";
import { updateUserAvatar, updateUserStatus } from "../../global/store/settings_model";
import { checkDialog } from "../../global/store/chat_model";
import { sendInviteToUser } from "../../global/store/events_model";
import { User } from "../../global/interfaces";
import { useAuthAndInithialSocket } from "../../global/hooks/useAuthAndInithialSocket";
import CustomLoader from "../../components-ui/CustomLoader/CustomLoader";
import ProfileView from "./ProfileView/profileView";
import PageContainer from "../../global/components/PageContainer/pageContainer";

function Profile(): JSX.Element {

    const route = useRouter();
    const userLoaded = useStore(isUserLoaded);
    const currentUserLoaded = useStore(isCurrentUserLoaded);
    const currentUser = useStore($currentProfileUser);
    const authedUser = useStore($user);
    const isConnected = useAuthAndInithialSocket();

    const [addingImageStatus, setAddingImageStatus] = useState<boolean>(false);
    const [isModal, setIsModal] = useState<boolean>(false);
    const [isAddPostModal, setIsAddPostModal] = useState<boolean>(false);
    const [isInviteModal, setIsInviteModal] = useState<boolean>(false);
    const [choosedEventForInvite, setChoosedEventForInvite] = useState<number>();

    const changeAddingImageStatus = (status: boolean) => {
        if(currentUser.login === authedUser?.login) {
            setAddingImageStatus(() => status);
        }
    }

    const onChangeInputImage = (event: ChangeEvent<HTMLInputElement>) => {
        updateUserAvatar(event).then((res: { data: User }) => {
            setCurrentProfileUser(res.data)
            setUser(res.data);
        })
        setIsModal(true);
    }

    const handleSaveNewStatus = (userStatus: string) => {
        updateUserStatus(userStatus).then( (user: User) => {
            setUser(user);
            setCurrentProfileUser(user);
        });
    };

    const handleStartDialog = () => {
        checkDialog(currentUser);
        Router.push('/messanger')
    } 
    const onImageModalClick = (status: boolean) => {
        if (status) {
            window.location.reload();
        }
        setIsModal(false);
    }

    const onAddingModalClick = () => {
        setIsAddPostModal(false);
    }

    const handleSendInvite = () => {
        sendInviteToUser({ userToId: currentUser.userId, eventId: choosedEventForInvite });
        setIsInviteModal(false);
    }

    useEffect(() => {
        return () => {
            setCurrentProfileUser({} as User);
        }
    }, [])
    useEffect( () => {
        if (!route.isReady) return;
        getDataForProfilePage(String(route.query.id));
    }, [route.isReady, route.asPath]);
    
    if (currentUserLoaded) {
        return(
            <PageContainer>
                <ProfileView
                    asyncLoaded={userLoaded}
                    addingImageStatus={addingImageStatus}
                    currentUser={currentUser}
                    authedUser={authedUser}
                    isAddPostModal={isAddPostModal}
                    isImageModal={isModal}
                    isInviteModal={isInviteModal}
                    handleSendInvite={handleSendInvite}
                    setChoosedEventForInvite={setChoosedEventForInvite}
                    setIsAddPostModal={setIsAddPostModal}
                    setIsInviteModal={setIsInviteModal}
                    handleStartDialog={handleStartDialog}
                    onChangeInputImage={onChangeInputImage}
                    handleSaveNewStatus={handleSaveNewStatus}
                    changeAddingImageStatus={changeAddingImageStatus}
                    onAddingModalClick={onAddingModalClick}
                    onImageModalClick={onImageModalClick}
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