import { IGroup, IGroupMembersInfo } from '../../../global/interfaces/groups';
import { baseURL } from '../../../global/store/store';
import { AiFillHeart, AiOutlineEye, AiOutlineVideoCamera } from 'react-icons/ai';
import { RiDiscussLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { BiComment, BiPhotoAlbum, BiRepost } from 'react-icons/bi';
import { customizeDateToYYYYMMDDFormat } from '../../../global/helpers/helper';
import s from './GroupInfoPageView.module.scss';
import { FiSettings } from 'react-icons/fi';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';
import CustomSlider from '../../../components-ui/CustomSlider/CustomSlider';

export default function GroupInfoPageView (props: {
    groupInfo: IGroup,
    groupMembersInfo: IGroupMembersInfo[],
    isAutherUserCreator: boolean,
    handleOpenGroupSettings: () => void,
    handleOpenComments: () => void,
    handleOpenAddingPost: () => void,
    isSettingsGroupOpen: boolean
}) {
    return (
        <div className={s.groupInfo}>
            <div 
                className={s.head}
                style={{ backgroundImage: `url(${baseURL}${props.groupInfo?.headAvatar})` }}
            >
                <div className={s.subHead}>
                    <div 
                        className={s.mainAvatar}
                        style={{ backgroundImage: `url(${baseURL}${props.groupInfo?.mainAvatar})` }}
                    ></div>
                    <div className={s.title}>{props.groupInfo?.name}</div>
                    <div className={s.settings}>
                        {
                            props.isAutherUserCreator && 
                            <span onClick={props.handleOpenGroupSettings}>
                                Управление <FiSettings fontSize={18} />
                            </span>
                        }
                    </div>
                </div>
            </div>
            <div className={s.talks}>
                <div>Обсуждения <RiDiscussLine fontSize={20} /></div>
                <div>Фото <BiPhotoAlbum fontSize={20} /></div>
                <div>Видео <AiOutlineVideoCamera fontSize={20} /></div>
                <div>Вложения <ImAttachment fontSize={20} /></div>
            </div>
            <div className={s.postForm}>
                <button className={s.actionBtn} onClick={props.handleOpenAddingPost}>Добавить публикацию</button>
                <span className={s.countPosts}>Публикаций в сообществе - {props.groupInfo?.posts?.length}</span>
            </div>
            <div className={s.content}>
                <div className={s.postList}>
                    {
                      props.groupInfo?.posts?.map(el => (
                            <div className={s.post} key={el.id}>
                                <div className={s.title}>
                                    {el.id}. {el.title} <span className={s.date}>{customizeDateToYYYYMMDDFormat(el.date)}</span>
                                </div>
                                <div className={s.file}>
                                    { 
                                        el.files?.length > 0 &&
                                        <CustomSlider 
                                            images={
                                                el.files?.map(el => {
                                                    if (el.type.includes('image')) return { image: baseURL + el.src }
                                                })
                                            } 
                                            width='400px' 
                                            height='300px' 
                                        />
                                    }
                                </div>
                                <div className={s.description}>
                                    {el.description}
                                </div>
                                <div className={s.actions}>
                                    {el.likes}<AiFillHeart fontSize={25} />
                                    10
                                    <BiComment 
                                        fontSize={25}
                                        onClick={props.handleOpenComments}
                                    />
                                    1<BiRepost fontSize={25} />
                                    <div className={s.views}>
                                        <AiOutlineEye fontSize={25} />
                                        100
                                    </div>
                                </div>
                            </div>
                        ))  
                    }
                </div>
                <div className={s.leftInfo}>
                    Участники: {props.groupMembersInfo?.length}
                    <div className={s.members}>
                        {
                            props.groupMembersInfo?.map(el => (
                                <div 
                                    className={s.member} 
                                    key={el.login}
                                    style={{ backgroundImage: `url(${baseURL}${el.avatar})` }}
                                >
                                    <span className={s.memberName}>{el.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}