import s from './emoji.module.scss'

export default function Emoji(): JSX.Element {
    return (
        <div className={s.emoji}>
            <p className={s.defaultEmoji}>&#128512;</p>
        </div>
    )
}