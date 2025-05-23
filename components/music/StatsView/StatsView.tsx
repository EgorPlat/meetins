import { useEffect } from "react";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { myStatistic, getMyMusicStatistic } from "@/global/store/music_model";
import { baseURL } from "@/global/store/store";
import s from "./StatsView.module.scss";

export default function StatsView() {

    const myStatistic$ = useUnit(myStatistic);
    const { t } = useTranslation();

    useEffect(() => {
        getMyMusicStatistic();
    }, []);

    if (myStatistic$.length === 0) {
        return <span>{t("У Вас нет опубликованных композиций")}</span>
    }
    return (
        <div className={s.statsView}>
            {
                myStatistic$.map(el => (
                    <div className={s.composition} key={el.title}>
                        <img className={s.image} src={baseURL + el.image} />
                        <div className={s.info}>
                            <div className={s.author}>{el.author}</div>
                            <div className={s.title}>
                                <span className={s.header}>{t("Трек")}: </span>
                                {el.title}
                            </div>
                            <div className={s.playsNumber}>{t("Количество прослушиваний")}: {el.playsNumber}</div>
                            <div className={s.listenersCount}>{t("Количество слушателей")}: 1</div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}