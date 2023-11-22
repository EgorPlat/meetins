import { IGroup, IGroupMembersInfo } from '../../../global/interfaces/groups';
import { baseURL } from '../../../global/store/store';
import { AiFillHeart, AiOutlineEye, AiOutlineVideoCamera } from 'react-icons/ai';
import { RiDiscussLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { BiComment, BiPhotoAlbum, BiRepost } from 'react-icons/bi';
import { customizeDateToYYYYMMDDFormat, destrucutreFilesInGroupPost } from '../../../global/helpers/helper';
import s from './GroupInfoPageView.module.scss';
import { FiSettings } from 'react-icons/fi';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';
import CustomSlider from '../../../components-ui/CustomSlider/CustomSlider';
import { groupInfo } from '../../../global/store/groups_model';

export default function GroupInfoPageView (props: {
    groupInfo: IGroup,
    groupMembersInfo: IGroupMembersInfo[],
    isAutherUserCreator: boolean,
    handleOpenGroupSettings: () => void,
    handleOpenComments: () => void,
    handleOpenAddingPost: () => void,
    handleOpenTalks: () => void,
    isSettingsGroupOpen: boolean
}) {
    const enchancedPosts = destrucutreFilesInGroupPost(props.groupInfo);
    
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
                <div className={s.item}>Обсуждения <RiDiscussLine fontSize={20} onClick={props.handleOpenTalks} /></div>
                <div className={s.item}>Фото <BiPhotoAlbum fontSize={20} /></div>
                <div className={s.item}>Видео <AiOutlineVideoCamera fontSize={20} /></div>
                <div className={s.item}>Вложения <ImAttachment fontSize={20} /></div>
            </div>
            <div className={s.postForm}>
                <button className={s.actionBtn} onClick={props.handleOpenAddingPost}>Добавить публикацию</button>
                <span className={s.countPosts}>Публикаций в сообществе - {props.groupInfo?.posts?.length}</span>
            </div>
            <div className={s.content}>
                <div className={s.postList}>
                    {
                        enchancedPosts.map(post => (
                            <div className={s.post} key={post.id}>
                                <div className={s.title}>
                                    {post.id}. {post.title} <span className={s.date}>{customizeDateToYYYYMMDDFormat(post.date)}</span>
                                </div>
                                <div className={s.file}>
                                    {
                                        post.files.image?.length > 0 &&
                                        <CustomSlider 
                                            images={
                                                post.files.image.map(el => {
                                                    return {
                                                        image: baseURL + el.src
                                                    }
                                                })
                                            } 
                                            width='300px' 
                                            height='300px' 
                                        />
                                    }
                                </div>
                                <div className={s.description}>
                                    {post.description}
                                </div>
                                <div className={s.actions}>
                                    {post.likes}<AiFillHeart fontSize={25} />
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