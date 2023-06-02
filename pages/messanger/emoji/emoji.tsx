import { useEffect, useState } from 'react'
import s from './emoji.module.scss'
import EmojiList from './emojiList/emojiList'

export default function Emoji(props: {addSmileHandler: (emoji) => void}): JSX.Element {

    const [isEmojiListOpen, setIsEmojiListOpen] = useState<boolean>(false);
    const onAddSmile = (emoji) => {
        props.addSmileHandler(emoji);
    }
    const onWrapperClick = (e) => {
        e.preventDefault();
        setIsEmojiListOpen(!isEmojiListOpen);
    }
    return (
        <div className={s.emoji}>
            <div className={s.defaultEmoji} onClick={onWrapperClick}>&#9787;</div>
            <div className={s.emojiListWrapper}>
            { isEmojiListOpen && <EmojiList onAddSmile={onAddSmile}/> }
            </div>
        </div>
    )
}