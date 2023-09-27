import { IGroup, IGroupMembersInfo } from '../../../global/interfaces/groups';
import { baseURL } from '../../../global/store/store';
import { AiFillHeart, AiOutlineEye } from 'react-icons/ai';
import { BiComment, BiRepost } from 'react-icons/bi';
import { customizeDateToYYYYMMDDFormat } from '../../../global/helpers/helper';
import s from './GroupInfoPageView.module.scss';
import { FiSettings } from 'react-icons/fi';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';

export default function GroupInfoPageView (props: {
    groupInfo: IGroup,
    groupMembersInfo: IGroupMembersInfo[],
    isAutherUserCreator: boolean,
    handleOpenGroupSettings: () => void,
    isSettingsGroupOpen: boolean,
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
            <div className={s.postForm}>
                Создать новый пост? <button className={s.actionBtn}>Добавить публикацию</button>
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
                                        el.file &&
                                        el.file.type === 'image' ?
                                        <img width="100%" height="300px" src={baseURL + el.file.src} /> : null
                                    }
                                </div>
                                <div className={s.description}>
                                    {el.description}
                                </div>
                                <div className={s.actions}>
                                    {el.likes}<AiFillHeart fontSize={25} />
                                    10<BiComment fontSize={25} />
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
                    Участники: 1
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