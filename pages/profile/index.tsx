import { useRouter } from "next/router";
import React, { useEffect } from "react";
import message from "../../public/images/message.svg";
import { setCurrentPage } from "../../global/store/store";
import s from "./profile.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link";
import Image from "next/image";
import Interests from "./interests/interests";
import Places from "./places/places";
import ImageList from "./ImageList/ImageList";
function Profile(): JSX.Element {

    const route = useRouter();

    useEffect( () => {
        setCurrentPage(route.pathname);
    }, [route])
    return(
        <div className={s.profile}>
            <div className="row">
                <div className={`col-md-3 ${s.navCol}`}>
                    <ul className={s.ul}>
                        <li><Link href="">Диалоги</Link></li>
                        <li><Link href="">Встречи</Link></li>
                    </ul>
                </div>
                <div className={`col-md-7 ${s.bodyCol}`}>
                    <div className={`row`}>
                        <div className={`col-md-4 ${s.bodyInfo}`}>
                           <img 
				            src="https://upload.wikimedia.org/wikipedia/commons/8/87/Igor_V._Rybakov_TN.jpg" 
					        alt="Аватарка" 
					        className={`${s.round} ${s.avatar}`}
			                />
                        </div>
                        <div className={`col-md-8 ${s.userInfo}`}>
                            <div className="row">
                                <div className={`col ${s.userName}`}>
                                    Дима Рыбаков
                                </div>
                                <button className={`col ${s.status}`}>
                                    В поисках друзей
                                </button>
                            </div>
                            <div className={`${s.text}`}>
                                Люблю ЗОЖ, различные виды спорта, активных отдых на природе.
                            </div>
                            <div className={`${s.actions}`}>
                                <button type="button" className={`${s.actionsBtn}`}>
                                    Диалог
                                    <Image alt="Сообщение" src={message} width={20} height={20} />
                                </button>
                                <button type="button" className={`${s.actionsBtn}`}>Приглашение +</button>
                            </div>
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
                </div>
            </div>
        </div>
    )
}

export default Profile;