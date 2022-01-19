import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import message from "../../public/images/message.svg";
import { $user, getUserDataByLoginUrl, isAsyncLoaded, setCurrentPage, setIsAsyncLoaded, User } from "../../global/store/store";
import s from "./profile.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import Interests from "./interests/interests";
import Places from "./places/places";
import ImageList from "./ImageList/ImageList";
import { useStore } from "effector-react";
import Loader from "../../global/Loader/Loader";
import About from "./About/About";
import LeftNavMenu from "../../global/LeftNavMenu/LeftNavMenu";
import InputFile from "../../global/helpers/InputFile/InputFile";
function Profile(): JSX.Element {

    const route = useRouter();
    const asyncLoaded = useStore(isAsyncLoaded);

    const [user, setUser] = useState<User>();
    const [addingImageStatus, setAddingImageStatus] = useState<boolean>(false);
    const authedUser = useStore($user);

    const changeAddingImageStatus = (status: boolean) => {
        if(user?.email === authedUser?.email) {
            setAddingImageStatus(() => status);
        }
    }
    const onChangeInputImage = (file: any) => {
        console.log(file);
    }
    useEffect( () => {
        setCurrentPage(route.pathname);
        if(route.query.id !== undefined) {
            getUserDataByLoginUrl(String(route.query.id)).then( (res) => {
                if(res?.status <= 227) {
                    setUser(() => res.data);
                    setIsAsyncLoaded(true);
                }
            })
        }
    }, [route])
    return( 
        <div className={s.profile}>
            <div className="row">
                <div className={`col-md-3 ${s.navCol}`}>
                    <LeftNavMenu />
                </div>
                {asyncLoaded 
                ? 
                <div className={`col-md-8 ${s.bodyCol}`}>
                <div className={`row`}>
                    <div className={`col-md-4 ${s.bodyInfo}`}>
                       {!addingImageStatus ?
                       <img 
                        onMouseEnter={() => changeAddingImageStatus(true)}
                        src={'https://api.meetins.ru/' + user?.userIcon}
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
                                {user?.firstName + " " + user?.lastName}
                            </div>
                            <button className={`col ${s.status}`}>
                                В поисках друзей
                            </button>
                        </div> 
                        <div className={`${s.text}`}>
                            <About user={user} about={'Люблю ЗОЖ, различные виды спорта, активных отдых с друзьями, природу.'}/>
                        </div>
                        { JSON.stringify(user) !== JSON.stringify(authedUser) ?
                        <div className={`${s.actions}`}>
                            <button type="button" className={`${s.actionsBtn}`}>
                                Диалог
                                <Image alt="Сообщение" src={message} width={20} height={20} />
                            </button>
                            <button type="button" className={`${s.actionsBtn}`}>Приглашение +</button>
                        </div> : null
                        }
                    </div>
                </div>
                <div className={`row ${s.moreInfo}`}>
                    <div className="col">
                        <Interests interest={['Плавание','Йога','Волейбол','Бокс']}/>
                    </div>
                    <div className="col">
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
    )
}

export default Profile;