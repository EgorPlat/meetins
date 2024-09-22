import { useState } from "react"
import s from "./emoji.module.scss"
import EmojiList from "./EmojiList/emojiList";
import { GoSmiley } from "react-icons/go";

export default function Emoji(props: {addSmileHandler: (emoji) => void}): JSX.Element {

    const [isEmojiListOpen, setIsEmojiListOpen] = useState<boolean>(false);
    
    const onAddSmile = (emoji) => {
        props.addSmileHandler(emoji);
    };

    const onWrapperClick = (e) => {
        e.preventDefault();
        setIsEmojiListOpen(!isEmojiListOpen);
    };

    return (
        <div className={s.emoji}>
            <GoSmiley fontSize={28} onClick={onWrapperClick} color="gray"/>
            <div className={s.emojiListWrapper}>
                { isEmojiListOpen && <EmojiList onAddSmile={onAddSmile}/> }
            </div>
        </div>
    )
}