import Router, { useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import message from "../../public/images/message.svg";
import { $currentProfileUser, $user, baseURL, getDataForProfilePage, isAsyncLoaded, setCurrentProfileUser, setUser } from "../../global/store/store";
import s from "./profile.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import Interests from "./interests/interests";
import Places from "./places/places";
import ImageList from "./ImageList/ImageList";
import { useStore } from "effector-react";
import About from "./About/About";
import InputFile from "../../global/helpers/InputFile/InputFile";
import { updateUserAvatar, updateUserStatus } from "../../global/store/settings_model";
import PageContainer from "../../components/pageContainer/pageContainer";
import { checkDialog, } from "../../global/store/chat_model";
import Modal from "../../global/helpers/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import AddingPosts from "./AddingPosts/AddingPosts";
import CustomModal from "../../global/helpers/CustomModal/CustomModal";
import { useTranslation } from "react-i18next";

function Profile(): JSX.Element {

    const route = useRouter();
    const asyncLoaded = useStore(isAsyncLoaded);
    const { t } = useTranslation();
    const currentUser = useStore($currentProfileUser);
    const [addingImageStatus, setAddingImageStatus] = useState<boolean>(false);
    const authedUser = useStore($user);
    const [isModal, setIsModal] = useState(false);
    const [isAddPostModal, setIsAddPostModal] = useState(false);

    const changeAddingImageStatus = (status: boolean) => {
        if(currentUser.login === authedUser?.login) {
            setAddingImageStatus(() => status);
        }
    }
    const onChangeInputImage = (event: ChangeEvent<HTMLInputElement>) => {
        updateUserAvatar(event).then((res: any) => {
            setCurrentProfileUser(res.data)
            setUser(res.data);
        })
        setIsModal(true);
    }
    const saveNewStatus = useCallback((userStatus: string) => {
        updateUserStatus(userStatus).then( (user: any) => {
            setUser(user);
            setCurrentProfileUser(user);
        });
    }, [])
    const startDialog = () => {
        checkDialog(currentUser);
        Router.push('/messanger')
    } 
    const onModalClick = (status: boolean) => {
        if (status) {
            window.location.reload();
        }
        setIsModal(false);
    }
    const onAddingModalClick = () => {
        setIsAddPostModal(false);
    }
    useEffect( () => {
        getDataForProfilePage(route);
    }, [route])
    return(
        <PageContainer>
        <div className={s.profile}>
            {   
                asyncLoaded ? 
                <div className={`${s.bodyCol}`}>

                    <div className={`${s.block} ${s.mainBlock}`}>
                        <div className={`${s.bodyInfo}`}>
                            {
                                !addingImageStatus ?
                                <img 
                                    onMouseEnter={() => changeAddingImageStatus(true)}
                                    src={baseURL + currentUser.avatar}
                                    alt="Аватарка" 
                                    className={`${s.avatar}`}
                                    /> : <InputFile 
                                        onChange={(event) => onChangeInputImage(event)} 
                                        onMouseLeave={() => changeAddingImageStatus(false)}
                                />
                            }
                        </div>
                        <div className={`${s.userInfo}`}>
                            <div>
                                <div className={`${s.userName}`}>
                                    {currentUser.name + ', ' + currentUser.age}
                                </div>
                                <div className={s.town}>
                                    г. {currentUser.city}
                                </div>
                            </div>
                            { 
                                currentUser.login !== authedUser?.login ?
                                <div className={`${s.actions}`}>
                                    <button type="button" className={`${s.actionsBtn}`} onClick={startDialog}>
                                        {t('Диалог')}
                                        <Image alt="Сообщение" src={message} width={20} height={20} />
                                    </button>
                                    <button type="button" className={`${s.actionsBtn}`}>{t('Пригласить')} +</button>
                                </div> : null
                            }
                        </div>
                    </div>

                    <div className={`${s.block}`}>
                        <div className={`${s.text}`}>
                            <About saveNewUserStatus={saveNewStatus} user={currentUser}/>
                        </div>
                    </div>

                    <div className={`${s.moreInfo}`}>
                        <div className={`${s.block} ${s.interests}`}>
                            <Interests user={currentUser} authedUser={authedUser} />
                        </div>
                        <div className={`${s.block} ${s.places}`}>
                            <Places places={['Дворец спорта','Наполи','Манеж','Химик']}/>
                        </div>
                    </div> 

                    {
                        currentUser.login === authedUser?.login &&
                        <div className={s.addingPosts}>
                            <button onClick={() => setIsAddPostModal(true)}>{t('Добавить новую запись')}</button>
                        </div>
                    }
                    <div className={s.postsList}>
                        { authedUser && <ImageList currentUser={currentUser} authedUser={authedUser} /> }
                    </div>
                </div> : <Loader/>
            }
            { isModal ? 
                <Modal 
                    isDisplay={true} 
                    changeModal={onModalClick} 
                    actionConfirmed={onModalClick}>
                        <p>{t('Изменения вступят в силу после перезагрузки вкладки профиль')}.</p>
                </Modal>
            : null}
            { isAddPostModal ? 
                <CustomModal 
                    isDisplay={true} 
                    changeModal={onAddingModalClick} 
                    actionConfirmed={onAddingModalClick}
                    title={t('Добавить новую запись')}
                    typeOfActions="none"
                >
                    <AddingPosts />
                </CustomModal>
            : null}
        </div>
        </PageContainer>
    )
}

export default Profile;