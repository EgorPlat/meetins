import { useTranslation } from "react-i18next";
import Head from "next/head";
import s from "./EventsPageView.module.scss";
import Card from "../CategoryCard/Card";


export default function EventsPageView() {

    const { t } = useTranslation();
    
    return (
        <div className={s.events}>
            <Head>
                <title>Meetins-{t("Events")}</title>
                <meta name="description" content="Meetins - события" key="desc" />
                <meta property="og:title" content="Ищите события и приглашайте на них своих друзей!" />
                <meta
                    property="og:description"
                    content="Приглашайте своих новых друзей куда угодно!"
                />
            </Head>
            <div className={s.mainContent}>
                <Card
                    img_src="images/cinema.jpg"
                    name={t("Кино")}
                    categoryRoute='cinema'
                />
                <Card
                    img_src="images/theatre.jpg"
                    name={t("Театр")}
                    categoryRoute='theater'
                />
                <Card
                    img_src="images/concert.jpg"
                    name={t("Концерты")}
                    categoryRoute='concert'
                />
                <Card
                    img_src="images/exibition.jpg"
                    name={t("Выставки")}
                    categoryRoute='exhibition'
                />
                <Card
                    img_src="images/tour.jpg"
                    name={t("Экскурсии")}
                    categoryRoute='tour'
                />
                <Card
                    img_src="images/quest.jpg"
                    name={t("Квесты")}
                    categoryRoute='quest'
                />
            </div>
        </div>
    )
}