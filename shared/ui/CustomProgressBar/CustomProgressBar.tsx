import s from "./CustomProgressBar.module.scss";

export default function CustomProgressBar(props: {
    max: number,
    value: number,
    width: string,
    height: string,
    text: string
}) {
    return (
        <div className={s.wrapper} style={{ minWidth: props.width, height: props.height }}>
            <div className={s.title}>{props.text} {props.value}/{props.max}</div>
            <div 
                className={s.progress}
                style={{ 
                    width: `${100 * (props.value / props.max)}%`, 
                    height: props.height,
                }}
            >
            </div>
        </div>
    )
}