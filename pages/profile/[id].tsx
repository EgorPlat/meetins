import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import message from "../../public/images/message.svg";
import { $user, baseURL, getUserDataByLoginUrl, isAsyncLoaded, setCurrentPage, setIsAsyncLoaded, setUser, User } from "../../global/store/store";
import s from "./profile.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import Interests from "./interests/interests";
import Places from "./places/places";
import ImageList from "./ImageList/ImageList";
import { useStore } from "effector-react";
import Loader from "../../global/Loader/Loader";
import About from "./About/About";
import InputFile from "../../global/helpers/InputFile/InputFile";
import { updateUserAvatar, updateUserStatus } from "../../global/store/settings_model";
import PageContainer from "../../components/pageContainer/pageContainer";

function Profile(): JSX.Element {

    const route = useRouter();
    const asyncLoaded = useStore(isAsyncLoaded);

    const [currentUser, setCurrentUser] = useState<User>({} as User);
    const [addingImageStatus, setAddingImageStatus] = useState<boolean>(false);
    const authedUser = useStore($user);

    const changeAddingImageStatus = useCallback((status: boolean) => {
        if(currentUser.email === authedUser?.email) {
            setAddingImageStatus(() => status);
        }
    },[])
    const onChangeInputImage = useCallback((event: any) => {
        updateUserAvatar(event).then((res: any) => {
            if(res.status === 200) {
                setCurrentUser(res.data)
                setUser(res.data);
            }
        })
    },[])
    const saveNewStatus = useCallback((userStatus: string) => {
        updateUserStatus(userStatus).then( (res: any) => {
            if(res.status === 200) {
                setUser(res.data);
                setCurrentUser(res.data);
            }
        })  
    }, [])
    const startNewDialog = () => {

    }
    useEffect( () => {
        setCurrentPage(route.asPath);
        if(route.query.id !== undefined) {
            getUserDataByLoginUrl(String(route.query.id)).then( (res) => {
                if(res.status === 200) {
                    setCurrentUser(() => res.data);
                    setIsAsyncLoaded(true);
                }
            }) 
        }
    }, [route])
    return(
        <PageContainer>
            <div className={s.profile}>
            <div className="row">
                {asyncLoaded 
                ? 
                <div className={`col-md-10 ${s.bodyCol}`}>
                <div className={`row ${s.block}`}>
                    <div className={`col-md-4 ${s.bodyInfo}`}>
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
                                {currentUser.name}
                            </div>
                            <button className={`col ${s.status}`}>
                                В поисках друзей
                            </button>
                        </div> 
                        <div className={`${s.text}`}>
                            <About saveNewUserStatus={saveNewStatus} user={currentUser}/>
                        </div>
                        { JSON.stringify(currentUser) !== JSON.stringify(authedUser) ?
                        <div className={`${s.actions}`}>
                            <button type="button" className={`${s.actionsBtn}`} onClick={startNewDialog}>
                                Диалог
                                <Image alt="Сообщение" src={message} width={20} height={20} />
                            </button>
                            <button type="button" className={`${s.actionsBtn}`}>Приглашение +</button>
                        </div> : null
                        }
                    </div>
                </div>
                <div className={`row ${s.moreInfo}`}>
                    <div className={`col ${s.block} ${s.interests}`}>
                        <Interests interest={['Плавание','Йога','Волейбол','Бокс']}/>
                    </div>
                    <div className={`col ${s.block} ${s.places}`}>
                        <Places places={['Дворец спорта','Наполи','Манеж','Химик']}/>
                    </div>
                </div> 
                <div className={`row`}>
                    <div className="col">
                        <ImageList images={[]} />
                    </div>
                </div>
            </div> : <Loader/>}
            </div>
        </div>
        </PageContainer>
    )
}

export default Profile;

/*export async function getServerSideProps(context: any) {
    console.log(context);
    
    getUserDataByLoginUrl(String(context.query.id)).then( (res) => {
        if(res.status === 200) {
            setIsAsyncLoaded(true);
            return {
                props: {user: res.data}
            }
        } else {
            return {
                props: {}
            }
        }
    })
}*/