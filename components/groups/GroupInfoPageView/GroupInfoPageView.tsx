
import { User } from "@/entities";
import { IGroup, IGroupMembersInfo, IGroupPost, IGroupFile } from "@/entities/groups";
import { baseURL } from "@/global/store/store";
import { customizeDateToYYYYMMDDHHMMFormat } from "@/shared/functions/getDateInYYYYMMDDHHFormat";
import { AiOutlineVideoCamera, AiFillHeart, AiOutlineEye } from "react-icons/ai";
import { BiPhotoAlbum, BiComment } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { RiDiscussLine } from "react-icons/ri";
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
import CustomSlider from "@/shared/ui/CustomSlider/CustomSlider";
import s from "./GroupInfoPageView.module.scss";


export default function GroupInfoPageView(props: {
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
    handleOpenMembersList: () => void,
    isSettingsGroupOpen: boolean,
    videoPhotoAttachmentsInfo: { images: IGroupFile[], videos: IGroupFile[], attachments: any[] }
}) {
    const postsFromNewToPrevious = props.groupInfo?.posts?.sort((p, n) => {
        if (p.date > n.date) return -1; else return 1;
    });

    if (props.groupInfo) {
        return (
            <div className={s.groupInfo}>
                <div
                    className={s.head}
                    style={
                        props.groupInfo?.headAvatar 
                            ? { backgroundImage: `url(${baseURL}${props.groupInfo?.headAvatar})` }
                            : { border: "1px dashed var(--text-color)" }
                    }
                >
                    { 
                        !props.groupInfo?.headAvatar && 
                        <span>Создатель сообщества не загрузил изображение...</span> 
                    }
                    <div className={s.subHead}>
                        <div
                            className={s.mainAvatar}
                            style={{ backgroundImage: `url(${baseURL}${props.groupInfo?.mainAvatar})` }}
                        ></div>
                        <span className={s.title}>{props.groupInfo?.name}</span>
                        <div className={s.settings}>
                            {
                                props.isAutherUserCreator &&
                                <span className={s.settingsText} onClick={props.handleOpenGroupSettings}>
                                    Управление <FiSettings fontSize={18} />
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <div className={s.description}>
                    {props.groupInfo?.description}
                </div>
                <div className={s.sections}>
                    <div className={s.item} onClick={props.handleOpenTalks}>
                        Обсуждения
                        <RiDiscussLine fontSize={20} />
                    </div>
                    <div className={s.item} onClick={props.handleOpenPhotos}>
                        Фото
                        <BiPhotoAlbum fontSize={20} />
                    </div>
                    <div className={s.item} onClick={props.handleOpenVideos}>
                        Видео
                        <AiOutlineVideoCamera fontSize={20} />
                    </div>
                    <div className={s.item}>
                        Ещё
                        <ImAttachment fontSize={20} />
                    </div>
                </div>
                <div className={s.postForm}>
                    <CustomButton text="Добавить публикацию" onClick={props.handleOpenAddingPost} />
                    <span className={s.countPosts}>Публикаций - {props.groupInfo?.posts?.length}</span>
                </div>
                <div className={s.content}>
                    <div className={s.postList}>
                        {
                            postsFromNewToPrevious?.length === 0 &&
                            <div className={s.noPosts}>
                                <div className={s.main}>В сообществе пока нет ни одной публикации...</div>
                                <div className={s.text}>Вы можете опубликовать запись, даже если Вы не являетесь участником.</div>
                            </div>
                        }
                        {
                            postsFromNewToPrevious?.map(post => (
                                <div className={s.post} key={post.id}>
                                    <div className={s.title}>
                                        {post.title}
                                        <span className={s.date}>{customizeDateToYYYYMMDDHHMMFormat(post.date)}</span>
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
                                                }
                                                width='300px'
                                                height='300px'
                                            />
                                        }
                                    </div>
                                    <div className={s.descriptionPost}>
                                        {post?.description}
                                    </div>
                                    <div className={s.actions}>
                                        <div 
                                            className={
                                                post.likes.includes(props.authedUser.userId)
                                                    ? `${s.likes} ${s.active}`
                                                    : `${s.likes} ${s.inActive}`
                                            }
                                            onClick={() => props.handleLikePost(post, props.groupInfo?.groupId)}
                                        >
                                            {post.likes.length}
                                            <AiFillHeart fontSize={25} />
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
                        <div className={s.title}>
                            <span>Участники: {props.groupMembersInfo?.length}</span>
                            {
                                props.groupMembersInfo?.length >= 3 && 
                                    <span className={s.allMembers} onClick={props.handleOpenMembersList}> Посмотреть всех</span>
                            }
                        </div>
                        <div className={s.members}>
                            {
                                props.groupMembersInfo?.slice(0, 3)?.map(el => (
                                    <div className={s.member} key={el.login}>
                                        <div
                                            className={s.image}
                                            style={{ backgroundImage: `url(${baseURL}${el.avatar})` }}
                                        ></div>
                                        <div className={s.name}>{el.name}</div>
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