import { useRouter } from "next/router";
import s from "./Card.module.scss";

interface ICardProps {
	img_src: string,
	name: string,
	categoryRoute: string
}
export default function Card(props: ICardProps): JSX.Element {

    const router = useRouter();

    const pushToCategory = () => {
        router.push(`eventsCategory/${props.categoryRoute}`);
    };

    return (
        <div 
            style = {{ backgroundImage: `url(${props.img_src})`, backgroundSize: "cover" }} 
            className={s.card} 
            onClick = {pushToCategory}
        >
            <div className={s.title}>{props.name}</div>
        </div>
    )
}
