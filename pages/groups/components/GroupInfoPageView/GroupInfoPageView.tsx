import { IGroup, IGroupFile, IGroupMembersInfo, IGroupPost } from '../../../../global/interfaces/groups';
import { baseURL } from '../../../../global/store/store';
import { AiFillHeart, AiOutlineEye, AiOutlineVideoCamera } from 'react-icons/ai';
import { RiDiscussLine } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { BiComment, BiPhotoAlbum } from 'react-icons/bi';
import { customizeDateToYYYYMMDDHHMMFormat } from '../../../../global/helpers/helper';
import s from './GroupInfoPageView.module.scss';
import { FiSettings } from 'react-icons/fi';
import CustomSlider from '../../../../components-ui/CustomSlider/CustomSlider';
import { User } from '../../../../global/interfaces';

export default function GroupInfoPageView (props: {
    authedUser: User,
    groupInfo: IGroup,
    groupMembersInfo: IGroupMembersInfo[],
    isAutherUserCreator: boolean,
    handleOpenGroupSettings: () => void,
    handleOpenComments: (postId: number) => void,
    handleOpenAddingPost: () => void,
    handleOpenTalks: () => void,
    handleOpenPhotos: () => void,
    handleOpenVideos: () => void,
    handleLikePost: (post: IGroupPost, groupId: number) => void,
    isSettingsGroupOpen: boolean,
    videoPhotoAttachmentsInfo: { images: IGroupFile[], videos: IGroupFile[], attachments: any[] }
}) {
    const postsFromNewToPrevious = props.groupInfo?.posts?.sort((p, n) => {
        if (p.date > n.date) return -1; else 1
    });
    
    if (props.groupInfo) {
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
                <div className={s.description}>
                    <span className={s.title}>Описание: </span>{props.groupInfo?.description}
                </div>
                <div className={s.talks}>
                    <div className={s.item} onClick={props.handleOpenTalks}>
                        Обсуждения {/*<span className={s.count}>{props.groupInfo?.talks?.length} </span>*/}
                        <RiDiscussLine fontSize={20} />
                    </div>
                    <div className={s.item} onClick={props.handleOpenPhotos}>
                        Фото {/*<span className={s.count}>{props.videoPhotoAttachmentsInfo.images.length} </span>*/}
                        <BiPhotoAlbum fontSize={20} />
                    </div>
                    <div className={s.item} onClick={props.handleOpenVideos}>
                        Видео {/*<span className={s.count}>{props.videoPhotoAttachmentsInfo.videos.length} </span>*/}
                        <AiOutlineVideoCamera fontSize={20} />
                    </div>
                    <div className={s.item}>
                        Ещё {/*<span className={s.count}>{props.groupInfo?.attachments?.length} </span>*/}
                        <ImAttachment fontSize={20} />
                    </div>
                </div>
                <div className={s.postForm}>
                    <button className={s.actionBtn} onClick={props.handleOpenAddingPost}>Добавить публикацию</button>
                    <span className={s.countPosts}>Публикаций в сообществе - {props.groupInfo?.posts?.length}</span>
                </div>
                <div className={s.content}>
                    <div className={s.postList}>
                        {
                            postsFromNewToPrevious?.map(post => (
                                <div className={s.post} key={post.id}>
                                    <div className={s.title}>
                                        {post.id}. {post.title} 
                                        <span className={s.date}>Опубликовано: {customizeDateToYYYYMMDDHHMMFormat(post.date)}</span>
                                    </div>
                                    <div className={s.file}>
                                        {
                                            post.files?.length > 0 &&
                                            <CustomSlider 
                                                files={
                                                    post.files.map(el => {
                                                        return {
                                                            ...el,
                                                            src: baseURL + el.src
                                                        }
                                                    })
                                                    //post.files
                                                } 
                                                width='450px' 
                                                height='300px' 
                                            />
                                        }
                                    </div>
                                    <div className={s.descriptionPost}>
                                        {post?.description}
                                    </div>
                                    <div className={s.actions}>
                                        <div className={s.likes}>
                                            {post.likes.length}
                                            <AiFillHeart 
                                                onClick={() => props.handleLikePost(post, props.groupInfo?.groupId)}
                                                fontSize={25} 
                                                color={post.likes.includes(props.authedUser.userId) ? 'red': ''}
                                            />
                                        </div>
                                        <div className={s.comments} onClick={() => props.handleOpenComments(post.id)}>
                                            {post.comments.length}
                                            <BiComment fontSize={25} />
                                            Комментарии
                                        </div>
                                        <div className={s.views}>
                                            Просм. 
                                            <AiOutlineEye fontSize={25} />
                                            1.728
                                        </div>
                                    </div>
                                </div>
                            ))  
                        }
                    </div>
                    <div className={s.leftInfo}>
                        <span>Участники: {props.groupMembersInfo?.length}</span>
                        {
                            props.groupMembersInfo?.length >= 3 && <span className={s.allMembers}> Посмотреть всех</span>
                        }
                        <div className={s.members}>
                            {
                                props.groupMembersInfo?.slice(0, 3)?.map(el => (
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
    } else {
        return null;
    }
}