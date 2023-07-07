import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageContainer from "../../components/PageContainer/pageContainer";
import Card from "./categoryCard/card";
import s from "./index.module.scss";
import Head from "next/head";


export default function Events(): JSX.Element {
	const [calendarValue, setCalenadarValue] = useState(new Date());
	const { t } = useTranslation();

	return (
		<PageContainer>
			<div className={s.events}>
				<Head>
					<title>Meetins-{t('Events')}</title>
					<meta name="description" content="Meetins - события" key="desc" />
					<meta property="og:title" content="Ищите события и приглашайте на них своих друзей!" />
					<meta
						property="og:description"
						content="Приглашайте своих новых друзей куда угодно!"
					/>
				</Head>
				<div className={s.mainContent}>
					<Card 
						img_src = "https://cdn.fishki.net/upload/post/2020/05/04/3307156/3cce757e8b8860e9638c2b95c91c2908.jpg" 
						name = {t("Кино")} 
						categoryRoute='cinema'
					/>
					<Card 
						img_src = "https://i.ytimg.com/vi/sdkIWcPPkG4/maxresdefault.jpg" 
						name = {t("Театр")} 
						categoryRoute='theater'
					/>
					<Card 
						img_src = "http://inrock.ru/wp-content/uploads/Aria-4946.jpg" 
						name = {t("Концерты")} 
						categoryRoute='concert'
					/>
					<Card 
						img_src = "https://mir-s3-cdn-cf.behance.net/projects/max_808/9d3ea769858235.Y3JvcCwxMTUwLDkwMCwzOTMsMA.jpg" 
						name = {t("Выставки")} 
						categoryRoute='exhibition'
					/>
					<Card 
						img_src = "https://yurmino.ru/wp-content/uploads/2021/09/scale_1200-4.jpg" 
						name = {t("Экскурсии")} 
						categoryRoute='tour'
					/>
					<Card 
						img_src = "https://topkin.ru/wp-content/uploads/2016/10/761S3hrbY3A.jpg" 
						name = {t("Квесты")} 
						categoryRoute='quest'
					/> 
				</div>
			</div>
		</PageContainer>
	)
}
