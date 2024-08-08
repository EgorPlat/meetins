import { useRouter } from 'next/router';
import { IMarkedUserInfo } from '../../../../global/interfaces';
import { baseURL, removeUserFromMarkedList } from '../../../../global/store/store';
import s from './markedUsers.module.scss';

export default function MarkedUsers(props: {
    markedUsers: IMarkedUserInfo[]
}) {

    const router = useRouter();

    const handleRemoveUser = (userId: string) => {
        removeUserFromMarkedList(userId);
    };

    const handleGoToUser = (login: number) => {
        router.push(`/profile/${login}`)
    };

    return (
        <div className={s.markedUsers} >
            <div className={s.list} >
                {
                    props.markedUsers?.length === 0 && 
                    <div className={s.warning}>
                        <h5 className={s.title}>У Вас нет пользователей в закладках.</h5>
                        <div className={s.subTitle}>Чтобы добавить пользователя в закладки перейдите в профиль.</div>
                    </div>
                }
                {
                    props.markedUsers?.map(el => (
                        <div className={s.markedUser} key={el.userId} onClick={() => handleGoToUser(el.login)}>
                            <img src={baseURL + el.avatar} className={s.avatar} />
                            <div className={s.name} >{el.name}</div>
                            <div className={s.actions} >
                                <button 
                                    className={s.actionRemove} 
                                    onClick={() => handleRemoveUser(el.userId)}
                                >x</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}