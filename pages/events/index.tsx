import { useState } from "react";
import PageContainer from "../../components/pageContainer/pageContainer";
import Card from "./card";
import s from "./index.module.scss";


export default function Events(): JSX.Element {
	const [calendarValue, setCalenadarValue] = useState(new Date());
	return (
		<PageContainer>
			<div className={s.events}>
				<div className={s.calendar}>
				    <input type = "date"/>
				</div>
				<div className={s.mainContent}>
					<Card img_src = "https://cdn.fishki.net/upload/post/2020/05/04/3307156/3cce757e8b8860e9638c2b95c91c2908.jpg" name = {"Кино"}/>
					<Card img_src = "https://i.ytimg.com/vi/sdkIWcPPkG4/maxresdefault.jpg" name = "Театр"/>
					<Card img_src = "http://inrock.ru/wp-content/uploads/Aria-4946.jpg" name = "Концерты"/>
					<Card img_src = "https://mir-s3-cdn-cf.behance.net/projects/max_808/9d3ea769858235.Y3JvcCwxMTUwLDkwMCwzOTMsMA.jpg" name = "Выставки"/>
					<Card img_src = "https://yurmino.ru/wp-content/uploads/2021/09/scale_1200-4.jpg" name = "Экскурсии"/>
					<Card img_src = "https://topkin.ru/wp-content/uploads/2016/10/761S3hrbY3A.jpg" name = "Квесты"/> 
				</div>
			</div>
		</PageContainer>
	)
}
