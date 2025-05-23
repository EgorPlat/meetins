import { useTranslation } from "react-i18next";
import s from "./StatsGeoView.module.scss";

export default function StatsTGeoView() {

    const { t } = useTranslation();

    return (
        <div className={s.statsGeoView}>
            {t("Пока нет информации")}.
        </div>
    )
}