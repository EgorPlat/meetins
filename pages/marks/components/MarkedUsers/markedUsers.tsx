import { useRouter } from "next/router";
import { $markedUsersInfo, baseURL, removeUserFromMarkedList } from "../../../../global/store/store";
import { useUnit } from "effector-react";
import s from "./markedUsers.module.scss";

export default function MarkedUsers() {

    const router = useRouter();
    const markedUsersInfo$ = useUnit($markedUsersInfo);

    const handleRemoveUser = (e, userId: string) => {
        e.stopPropagation();
        removeUserFromMarkedList(userId);
    };

    const handleGoToUser = (login: number) => {
        router.push(`/profile/${login}`)
    };

    return (
        <div className={s.markedUsers} >
            <div className={s.list} >
                {
                    markedUsersInfo$?.length === 0 &&
                    <div className={s.warning}>
                        <h5 className={s.title}>У Вас нет пользователей в закладках.</h5>
                        <div className={s.subTitle}>Чтобы добавить пользователя в закладки перейдите в профиль.</div>
                    </div>
                }
                {
                    markedUsersInfo$?.map(el => (
                        <div className={s.markedUser} key={el.userId} onClick={(e) => handleRemoveUser(e, el.userId)}>
                            <img src={baseURL + el.avatar} className={s.avatar} />
                            <div className={s.name} onClick={() => handleGoToUser(el.login)}>{el.name}</div>
                            <div className={s.actions} >
                                <button
                                    className={s.actionRemove}
                                >x</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}