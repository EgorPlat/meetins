import { useTranslation } from "react-i18next";
import s from "./StatsTimeView.module.scss";

export default function StatsTimeView() {
    
    const { t } = useTranslation();

    return (
        <div className={s.statsTimeView}>
            {t("Пока нет информации")}.
        </div>
    )
}