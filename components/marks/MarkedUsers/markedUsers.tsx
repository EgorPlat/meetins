import { useRouter } from "next/navigation";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { $markedUsersInfo, baseURL, removeUserFromMarkedList } from "@/global/store/store";
import s from "./markedUsers.module.scss";

export default function MarkedUsers() {

    const router = useRouter();
    const markedUsersInfo$ = useUnit($markedUsersInfo);
    const { t } = useTranslation();

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
                        <h5 className={s.title}>{t("У Вас нет пользователей в закладках")}</h5>
                        <div className={s.subTitle}>
                            {t("Чтобы добавить пользователя в закладки, перейдите к нему в профиль и нажмите кнопку 'Пометить важным'")}
                        </div>
                    </div>
                }
                {
                    markedUsersInfo$?.map(el => (
                        <div className={s.markedUser} key={el.userId} >
                            <img src={baseURL + el.avatar} className={s.avatar} onClick={() => handleGoToUser(el.login)} />
                            <div className={s.name}>{el.name}</div>
                            <div className={s.actions} >
                                <button
                                    className={s.actionRemove}
                                    onClick={(e) => handleRemoveUser(e, el.userId)}
                                >x</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}