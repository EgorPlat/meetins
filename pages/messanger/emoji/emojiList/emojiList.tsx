
import { emoji } from '../../../../global/constants'
import s from './emojiList.module.scss'

export default function EmojiList(props: {onAddSmile: (emoji) => void}): JSX.Element {

    const addSmile = (emoji) => {
        props.onAddSmile(String.fromCodePoint(emoji.hex));
    }
    return (
        <div className={s.emojiList}>
            {emoji.map(emoji => 
                <p 
                    key={emoji.dec}
                    className={s.defaultEmojiInList}
                    onClick={() => addSmile(emoji)}
                >{String.fromCodePoint(emoji.hex)}</p>
            )}
        </div>
    )
}