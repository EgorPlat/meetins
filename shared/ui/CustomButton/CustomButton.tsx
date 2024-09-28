import s from "./CustomButton.module.scss";

interface ICustomButtonProps {
    text: string,
    style?: Record<string, string>,
    [key: string]: any
}

export default function CustomButton(props: ICustomButtonProps) {

    const { text, style, ...restProps } = props;

    return (
        <button className={s.customButton} {...restProps} style={style}>
            {text}
        </button>
    )
}