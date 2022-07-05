import s from './emoji.module.scss'

export default function Emoji(): JSX.Element {
    return (
        <div className={s.emoji}>
            <p className={s.defaultEmoji}>&#9786;</p>
        </div>
    )
}