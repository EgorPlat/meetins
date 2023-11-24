import s from './CustomProgressBar.module.scss';

export default function CustomProgressBar(props: {
    max: number,
    value: number,
    width: string,
    height: string
}) {
    return (
        <div className={s.wrapper} style={{ width: props.width, height: props.height }}>
            <div className={s.title}>На встрече учавствуют 17/25 человек</div>
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