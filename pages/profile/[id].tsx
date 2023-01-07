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

function Profile(): JSX.Element {

    const route = useRouter();
    const asyncLoaded = useStore(isAsyncLoaded);

    const currentUser = useStore($currentProfileUser);
    const [addingImageStatus, setAddingImageStatus] = useState<boolean>(false);
    const authedUser = useStore($user);
    const [isModal, setIsModal] = useState(false);

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
    const handleUpdateUser = (user) => {
        setCurrentProfileUser(user);
    }
    useEffect( () => {
        getDataForProfilePage(route);
    }, [route])
    return(
        <PageContainer>
        <div className={s.profile}>
            <div className="row">
                {asyncLoaded 
                ? 
                <div className={`col-md-10 ${s.bodyCol}`}>

                <div className={`row ${s.block}`}>
                    <div className={`col-md-3 ${s.bodyInfo}`}>
                       {!addingImageStatus ?
                       <img 
                        onMouseEnter={() => changeAddingImageStatus(true)}
                        src={baseURL + currentUser.avatar}
                        alt="Аватарка" 
                        className={`${s.avatar}`}
                        /> : <InputFile 
                            onChange={(event) => onChangeInputImage(event)} 
                            onMouseLeave={() => changeAddingImageStatus(false)}
                        />}
                    </div>
                    <div className={`col-md-8 ${s.userInfo}`}>
                        <div className="row">
                            <div className={`col ${s.userName}`}>
                                {currentUser.name + ', ' + currentUser.age}
                            </div>
                        </div>
                        <div className={s.town}>
                            г. {currentUser.city}
                        </div>
                        { currentUser.login !== authedUser?.login ?
                        <div className={`${s.actions}`}>
                            <button type="button" className={`${s.actionsBtn}`} onClick={startDialog}>
                                Диалог
                                <Image alt="Сообщение" src={message} width={20} height={20} />
                            </button>
                            <button type="button" className={`${s.actionsBtn}`}>Пригласить +</button>
                        </div> : null
                        }
                    </div>
                </div>

                <div className={`row ${s.block}`}>
                    <div className={`${s.text}`}>
                        <About saveNewUserStatus={saveNewStatus} user={currentUser}/>
                    </div>
                </div>

                <div className={`row ${s.moreInfo}`}>
                    <div className={`col ${s.block} ${s.interests}`}>
                        <Interests user={currentUser} authedUser={authedUser} />
                    </div>
                    <div className={`col ${s.block} ${s.places}`}>
                        <Places places={['Дворец спорта','Наполи','Манеж','Химик']}/>
                    </div>
                </div> 

                {
                    currentUser.login === authedUser?.login &&
                    <div className={`row`}>
                        <div className="col">
                            <AddingPosts />
                        </div>
                    </div>
                }
                <div className={`row`}>
                    <div className="col">
                        { authedUser && <ImageList currentUser={currentUser} authedUser={authedUser} /> }
                    </div>
                </div>
            </div> : <Loader/>}
            </div>
            { isModal ? 
                <Modal 
                    isDisplay={true} 
                    changeModal={onModalClick} 
                    actionConfirmed={onModalClick}>
                        <p>Изменения вступят в силу после перезагрузки вкладки профиль.</p>
                </Modal>
            : null}
        </div>
        </PageContainer>
    )
}

export default Profile;