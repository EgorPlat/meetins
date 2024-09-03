import { useTranslation } from "react-i18next";
import { User } from "../../../../entities";
import { baseURL } from "../../../../global/store/store";
import { getDateInDMYFormat } from "../../../../shared/functions/getDateInDMFormat";
import { getIsUserMale } from "../../../../shared/functions/getIsUserMale";
import { MdEdit } from "react-icons/md";
import s from "./profileView.module.scss";
import About from "../About/About";
import Interests from "../../Interests/interests";
import PostsList from "../../PostsList/PostsList";
import Places from "../Places/places";
import Loader from "../../../../shared/ui/Loader/Loader";
import CustomModal from "../../../../shared/ui/CustomModal/CustomModal";
import Head from "next/head";
import React, { Suspense } from "react";
import CustomButton from "../../../../shared/ui/CustomButton/CustomButton";
import InputFile from "../../../../shared/ui/InputFile/InputFile";
import CustomEditMenu from "../../../../shared/ui/CustomEditMenu/CustomEditMenu";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";
const EditUserTag = React.lazy(() => import("../../../../features/forms/EditUserTag/Index"));
const ChoosingEvents = React.lazy(() => import("../СhoosingEvents/choosingEvents"));
const AddingPosts = React.lazy(() => import("../AddingPosts/AddingPosts"));
const ImageCropper = React.lazy(() => import("../../../../widgets/CropImage/CropImage"));

export default function ProfileView(props: {
    asyncLoaded: boolean,
    addingImageStatus: boolean,
    currentUser: User,
    authedUser: User,
    isAddPostModal: boolean,
    isInviteModal: boolean,
    isEditTagOpen: boolean,
    currentUserPlaces: string[],
    isCurrentUserOnline: boolean,
    newAvatarForCrop: string,
    handleSaveNewStatus: (status: string) => void,
    changeAddingImageStatus: (status: boolean) => void,
    onChangeInputImage: (event: any) => void,
    handleStartDialog: () => void,
    setIsInviteModal: (status: boolean) => void,
    setIsAddPostModal: (status: boolean) => void,
    handleSwapEditTag: (status: boolean) => void,
    setChoosedEventForInvite: (eventId: number) => void,
    onAddingModalClick: (status: boolean) => void,
    handleSendInvite: () => void,
    handleAddUserIntoMarked: () => void,
    handleGetCroppedAvatar: (blob: Blob) => void,
    setNewAvatarForCrop: (image: string | null) => void
}) {

    const { t } = useTranslation();
    const activeUser = props.authedUser?.userId === props.currentUser?.userId ? props.currentUser : props.currentUser;
    
    return (
        <div className={s.profile}>
            <Head>
                <title>Meetins - Профиль</title>
                <link rel='icon' href='/images/logo.svg' />
                <meta name="description" content="User profile" key="desc" />
                <meta property="og:title" content="Social Media Meetins for cool persons" />
                <meta
                    property="og:description"
                    content="Join us and get a lot of fun and new friends"
                />
            </Head>
            {   
                props.asyncLoaded && activeUser && props.authedUser ? 
                    <div className={`${s.bodyCol}`}>
                        <div className={`${s.block} ${s.mainBlock}`}>
                            <div className={`${s.bodyInfo}`}>
                                {
                                    !props.addingImageStatus && activeUser.avatar ?
                                        <img 
                                            onMouseEnter={() => props.changeAddingImageStatus(true)}
                                            src={baseURL + activeUser.avatar}
                                            alt="Аватарка" 
                                            className={`${s.avatar}`}
                                        /> : 
                                        <InputFile 
                                            onChange={(event) => props.onChangeInputImage(event)} 
                                            onMouseLeave={() => props.changeAddingImageStatus(false)}
                                        />
                                }
                            </div>
                            <div className={`${s.userInfo}`}>
                                <div>
                                    <div className={`${s.userName}`}>
                                        <div className={s.userNameAndTag}>
                                            {activeUser.name + ", " + activeUser.age}
                                            <div
                                                onClick={() => props.handleSwapEditTag(true)}
                                                className={s.userTag}
                                                style={{
                                                    backgroundColor: `${activeUser.tag?.color}`,
                                                }}
                                            >
                                                {activeUser.tag?.title}
                                                {
                                                    activeUser.login === props.authedUser.login && 
                                                    <MdEdit 
                                                        fontSize={18}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className={s.moreActions}>
                                            {
                                                activeUser.login !== props.authedUser.login &&
                                                <CustomEditMenu
                                                    data={[
                                                        { menuTitle: "Пометить важным", menuFunction: () => props.handleAddUserIntoMarked() },
                                                        { menuTitle: "Не получать уведомления", menuFunction: () => console.log(2) },
                                                        { menuTitle: "Посмотреть статистику", menuFunction: () => console.log(3) }
                                                    ]}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className={s.town}>
                                        г. {activeUser.city}
                                    </div>
                                    <div className={s.dateRegister}>
                                        <span>
                                            {
                                                getIsUserMale(activeUser.gender) 
                                                    ? `${t("зарегистрирован")}: ` 
                                                    : `${t("зарегистрирована")}: `
                                            }
                                        </span>
                                        {getDateInDMYFormat(activeUser.dateRegister)}
                                    </div>
                                    <div className={s.userStatus}>
                                        <p>{t("статус")}:</p>
                                        <p className={s.title}>                                        
                                            {
                                                props.isCurrentUserOnline || activeUser.login === props.authedUser.login
                                                    ? "В сети" 
                                                    : "Не в сети"
                                            }
                                        </p>
                                    </div>
                                    <p className={s.views}>
                                        {t("за последние 24 часа профиль просмотрен")}:
                                        <span className={s.count}> 150 {t("раз")}</span>
                                    </p>
                                </div>
                                { 
                                    activeUser.login !== props.authedUser.login ?
                                        <div className={`${s.actions}`}>
                                            <CustomButton
                                                text={t("Пригласить")}
                                                onClick={() => props.setIsInviteModal(true)}
                                            />
                                            <CustomButton
                                                text={t("Диалог")}
                                                onClick={props.handleStartDialog}
                                            />
                                        </div> : null
                                }
                            </div>
                        </div>

                        <div className={`${s.block}`}>
                            <div className={`${s.text}`}>
                                <About saveNewUserStatus={props.handleSaveNewStatus} user={activeUser}/>
                            </div>
                        </div>

                        <div className={`${s.moreInfo}`}>
                            <div className={`${s.block} ${s.interests}`}>
                                <Interests user={activeUser} authedUser={props.authedUser} />
                            </div>
                            <div className={`${s.block} ${s.places}`}>
                                <Places places={props.currentUserPlaces}/>
                            </div>
                        </div> 

                        {
                            activeUser.login === props.authedUser.login &&
                            <div className={s.addingPosts}>
                                <CustomButton text={t("Добавить новую запись")} onClick={() => props.setIsAddPostModal(true)} />
                            </div>
                        }
                        <div className={s.postsList}>
                            { props.authedUser && <PostsList currentUser={activeUser} authedUser={props.authedUser} /> }
                        </div>
                    </div> : <Loader/>
            }
            <CustomModal 
                isDisplay={props.isAddPostModal} 
                changeModal={props.onAddingModalClick} 
                actionConfirmed={props.onAddingModalClick}
                title="Добавить новую запись"
                typeOfActions="none"
            >
                <Suspense fallback={<CustomLoader />}>
                    <AddingPosts />
                </Suspense>
            </CustomModal>
            <CustomModal 
                isDisplay={props.isInviteModal} 
                changeModal={props.setIsInviteModal} 
                actionConfirmed={props.handleSendInvite}
                title="Выберите событие"
                typeOfActions="default"
            >
                <Suspense fallback={<CustomLoader />}>
                    <ChoosingEvents choosedEvent={props.setChoosedEventForInvite} />
                </Suspense>
            </CustomModal>
            <CustomModal 
                isDisplay={props.isEditTagOpen} 
                changeModal={props.handleSwapEditTag} 
                actionConfirmed={props.handleSwapEditTag}
                title="Настройте Ваш тэг"
                typeOfActions="none"
            >
                <Suspense fallback={<CustomLoader />}>
                    <EditUserTag />
                </Suspense>
            </CustomModal>
            <CustomModal 
                isDisplay={props.newAvatarForCrop ? true : false} 
                changeModal={() => props.setNewAvatarForCrop(null)} 
                actionConfirmed={() => props.setNewAvatarForCrop(null)}
                title="Настройте Ваше фото"
                typeOfActions="none"
            >
                <Suspense fallback={<CustomLoader />}>
                    <ImageCropper 
                        imageForCrop={props.newAvatarForCrop}
                        handleGetCropperImageBlob={props.handleGetCroppedAvatar}
                    />
                </Suspense>
            </CustomModal>
        </div>
    )
}