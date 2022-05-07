import s from "./card.module.scss";
export default function Card(props: any): JSX.Element {
	return (
		<div style = {{
			backgroundImage: `url(${props.img_src})`,
			backgroundSize: `cover`,
		}} className={s.card}>
            <h2>{props.name}</h2>
        </div>
	)
}
