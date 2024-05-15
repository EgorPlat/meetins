import { useTranslation } from 'react-i18next';
import { User } from '../../../global/interfaces';
import { baseURL } from '../../../global/store/store';
import { getDateInDMYFormat } from '../../../global/functions/getDateInDMFormat';
import { getIsUserMale } from '../../../global/functions/getIsUserMale';
import s from './profileView.module.scss';
import About from '../About/About';
import Interests from '../Interests/interests';
import PostsList from '../PostsList/PostsList';
import AddingPosts from '../AddingPosts/AddingPosts';
import ChoosingEvents from '../СhoosingEvents/choosingEvents';
import Places from '../Places/places';
import CustomEditMenu from '../../../components-ui/CustomEditMenu/CustomEditMenu';
import InputFile from '../../../components-ui/InputFile/InputFile';
import Loader from '../../../components-ui/Loader/Loader';
import Modal from '../../../components-ui/Modal/Modal';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';
import Input from '../../../components-ui/Input/Input';
import EditUserTag from '../../../global/forms/EditUsetTag/Index';
import Head from 'next/head';

// test 

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
    handleSaveNewStatus: (status: string) => void,
    changeAddingImageStatus: (status: boolean) => void,
    onChangeInputImage: (event: any) => void,
    handleStartDialog: () => void,
    setIsInviteModal: (status: boolean) => void,
    setIsAddPostModal: (status: boolean) => void,
    setIsEditTagOpen: (status: boolean) => void,
    setChoosedEventForInvite: (eventId: number) => void,
    onAddingModalClick: (status: boolean) => void,
    handleSendInvite: () => void,
    handleAddUserIntoMarked: () => void,
    handleOpenEditTag: () => void
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
                                    {activeUser.name + ', ' + activeUser.age}
                                    <div
                                        onClick={props.handleOpenEditTag}
                                        className={s.userTag}
                                        style={{backgroundColor: `${activeUser.tag?.color}`}}
                                    >{activeUser.tag?.title}</div>
                                </div>
                                <div className={s.town}>
                                    г. {activeUser.city}
                                </div>
                                <div className={s.dateRegister}>
                                    <span>
                                        {
                                        getIsUserMale(activeUser.gender) 
                                            ? `${t('зарегистрирован')}: ` 
                                            : `${t('зарегистрирована')}: `
                                        }
                                    </span>
                                    {getDateInDMYFormat(activeUser.dateRegister)}
                                </div>
                                <div className={s.userStatus}>
                                    {t('статус')}: <span className={s.title}>{props.isCurrentUserOnline ? "В сети" : "Не в сети"}</span>
                                </div>
                                <div className={s.vied}>
                                    {t('за последние 24 часа профиль просмотрен')}:
                                    <span className={s.count}> 150 {t("раз")}</span>
                                </div>
                            </div>
                            { 
                                activeUser.login !== props.authedUser.login ?
                                <div className={`${s.actions}`}>
                                    <button type="button" className={`${s.actionsBtn}`} onClick={props.handleStartDialog}>
                                        {t('Диалог')}
                                    </button>
                                    <button type="button" className={`${s.actionsBtn}`} onClick={() => props.setIsInviteModal(true)}>
                                        {t('Пригласить')}
                                    </button>
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
                            {
                                <Places places={props.currentUserPlaces}/>
                            }
                        </div>
                    </div> 

                    {
                        activeUser.login === props.authedUser.login &&
                        <div className={s.addingPosts}>
                            <button onClick={() => props.setIsAddPostModal(true)}>{t('Добавить новую запись')}</button>
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
            <CustomModal 
                isDisplay={props.isEditTagOpen} 
                changeModal={props.setIsEditTagOpen} 
                actionConfirmed={props.setIsEditTagOpen}
                title={t('Настройте Ваш тэг')}
                typeOfActions="none"
            >
                <EditUserTag />
            </CustomModal>
        </div>
    )
}