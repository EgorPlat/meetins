import { useStore } from "effector-react"
import { MusicControlBlockView } from "./MusicControlBlockView/MusicControlBlockView"
import { activeMusic, isMusicNeededOnBackground } from "../../store/music_model"

export const MusicControlBlock = () => {

    const activeMusic$ = useStore(activeMusic); 
    const isMusicNeededOnBackground$ = useStore(isMusicNeededOnBackground);

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