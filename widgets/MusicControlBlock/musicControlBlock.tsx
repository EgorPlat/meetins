import { useUnit } from "effector-react"
import { MusicControlBlockView } from "./MusicControlBlockView/MusicControlBlockView"
import { activeMusic, isMusicNeededOnBackground } from "../../global/store/music_model"

export const MusicControlBlock = () => {

    const activeMusic$ = useUnit(activeMusic); 
    const isMusicNeededOnBackground$ = useUnit(isMusicNeededOnBackground);

    if (activeMusic$ && isMusicNeededOnBackground$) {
        return (
            <MusicControlBlockView
                activeMusic={activeMusic$}
            />
        )
    } else {
        return null;
    }
}