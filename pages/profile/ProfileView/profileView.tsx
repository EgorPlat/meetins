import { useTranslation } from 'react-i18next';
import { User } from '../../../global/interfaces';
import { baseURL } from '../../../global/store/store';
import { getDateInDMYFormat } from '../../../global/functions/getDateInDMFormat';
import { getIsUserMale } from '../../../global/functions/getIsUserMale';
import message from "../../../public/images/message.svg";
import s from './profileView.module.scss';
import Image from "next/image";
import About from '../About/About';
import Interests from '../interests/interests';
import ImageList from '../ImageList/ImageList';
import AddingPosts from '../AddingPosts/AddingPosts';
import ChoosingEvents from '../СhoosingEvents/choosingEvents';
import Places from '../places/places';
import CustomEditMenu from '../../../components-ui/CustomEditMenu/CustomEditMenu';
import InputFile from '../../../components-ui/InputFile/InputFile';
import Loader from '../../../components-ui/Loader/Loader';
import Modal from '../../../components-ui/Modal/Modal';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';

// test 

export default function ProfileView(props: {
    asyncLoaded: boolean,
    addingImageStatus: boolean,
    currentUser: User,
    authedUser: User,
    isImageModal: boolean,
    isAddPostModal: boolean,
    isInviteModal: boolean,
    handleSaveNewStatus: (status: string) => void,
    changeAddingImageStatus: (status: boolean) => void,
    onChangeInputImage: (event: any) => void,
    handleStartDialog: () => void,
    setIsInviteModal: (status: boolean) => void,
    setIsAddPostModal: (status: boolean) => void,
    setChoosedEventForInvite: (eventId: number) => void,
    onImageModalClick: (status: boolean) => void,
    onAddingModalClick: (status: boolean) => void,
    handleSendInvite: () => void,
}) {
    
    const { t } = useTranslation();

    return (
        <div className={s.profile}>
            {   
                props.asyncLoaded && props.currentUser && props.authedUser ? 
                <div className={`${s.bodyCol}`}>

                    <div className={`${s.block} ${s.mainBlock}`}>
                        {
                            props.currentUser.login !== props.authedUser.login &&
                            <CustomEditMenu
                                data={[
                                    { menuTitle: "Пометить важным", menuFunction: () => console.log(1) },
                                    { menuTitle: "Не получать уведомления", menuFunction: () => console.log(2) }
                                ]}
                            />
                        }
                        <div className={`${s.bodyInfo}`}>
                            {
                                !props.addingImageStatus && props.currentUser.avatar ?
                                <img 
                                    onMouseEnter={() => props.changeAddingImageStatus(true)}
                                    src={baseURL + props.currentUser.avatar}
                                    alt="Аватарка" 
                                    className={`${s.avatar}`}
                                    /> : <InputFile 
                                        onChange={(event) => props.onChangeInputImage(event)} 
                                        onMouseLeave={() => props.changeAddingImageStatus(false)}
                                />
                            }
                        </div>
                        <div className={`${s.userInfo}`}>
                            <div>
                                <div className={`${s.userName}`}>
                                    {props.currentUser.name + ', ' + props.currentUser.age}
                                    <span 
                                        className={s.userTag}
                                        style={{backgroundColor: `${props.currentUser.tag?.color}`}}
                                    >{props.currentUser.tag?.title}</span>
                                </div>
                                <div className={s.town}>
                                    г. {props.currentUser.city}
                                </div>
                                <div className={s.dateRegister}>
                                    <span>
                                        {
                                        getIsUserMale(props.currentUser.gender) 
                                            ? 'зарегистрирован: ' 
                                            : 'зарегистрирована: '
                                        }
                                    </span>
                                    {getDateInDMYFormat(props.currentUser.dateRegister)}
                                </div>
                            </div>
                            { 
                                props.currentUser.login !== props.authedUser.login ?
                                <div className={`${s.actions}`}>
                                    <button type="button" className={`${s.actionsBtn}`} onClick={props.handleStartDialog}>
                                        {t('Диалог')}
                                        <Image alt="Сообщение" src={message} width={20} height={20} />
                                    </button>
                                    <button type="button" className={`${s.actionsBtn}`} onClick={() => props.setIsInviteModal(true)}>
                                        {t('Пригласить')} +
                                    </button>
                                </div> : null
                            }
                        </div>
                    </div>

                    <div className={`${s.block}`}>
                        <div className={`${s.text}`}>
                            <About saveNewUserStatus={props.handleSaveNewStatus} user={props.currentUser}/>
                        </div>
                    </div>

                    <div className={`${s.moreInfo}`}>
                        <div className={`${s.block} ${s.interests}`}>
                            <Interests user={props.currentUser} authedUser={props.authedUser} />
                        </div>
                        <div className={`${s.block} ${s.places}`}>
                            <Places places={['Дворец спорта','Наполи','Манеж','Химик']}/>
                        </div>
                    </div> 

                    {
                        props.currentUser.login === props.authedUser.login &&
                        <div className={s.addingPosts}>
                            <button onClick={() => props.setIsAddPostModal(true)}>{t('Добавить новую запись')}</button>
                        </div>
                    }
                    <div className={s.postsList}>
                        { props.authedUser && <ImageList currentUser={props.currentUser} authedUser={props.authedUser} /> }
                    </div>
                </div> : <Loader/>
            }
            <Modal 
                isDisplay={props.isImageModal} 
                changeModal={props.onImageModalClick} 
                actionConfirmed={props.onImageModalClick}
            >
                <p>{t('Изменения вступят в силу после перезагрузки вкладки профиль')}.</p>
            </Modal>
            <CustomModal 
                isDisplay={props.isAddPostModal} 
                changeModal={props.onAddingModalClick} 
                actionConfirmed={props.onAddingModalClick}
                title={t('Добавить новую запись')}
                typeOfActions="none"
            >
                <AddingPosts />
            </CustomModal>
            <CustomModal 
                isDisplay={props.isInviteModal} 
                changeModal={props.setIsInviteModal} 
                actionConfirmed={props.handleSendInvite}
                title={t('Выберите событие')}
                typeOfActions="default"
            >
                <ChoosingEvents choosedEvent={props.setChoosedEventForInvite} />
            </CustomModal>
        </div>
    )
}