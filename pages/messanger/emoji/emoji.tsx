import { useEffect, useState } from 'react'
import s from './emoji.module.scss'
import EmojiList from './emojiList/emojiList'
import { AiOutlineSmile } from 'react-icons/ai';

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
            <AiOutlineSmile fontSize={30} color='#3DB2FF' onClick={onWrapperClick}/>
            <div className={s.emojiListWrapper}>
            { isEmojiListOpen && <EmojiList onAddSmile={onAddSmile}/> }
            </div>
        </div>
    )
}