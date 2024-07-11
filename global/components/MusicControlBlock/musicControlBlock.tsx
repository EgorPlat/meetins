import { useStore } from "effector-react"
import { MusicControlBlockView } from "./MusicControlBlockView/MusicControlBlockView"
import { activeMusic, isMusicNeededOnBackground } from "../../store/music_model"
import { useEffect, useRef } from "react";

export const MusicControlBlock = () => {

    const activeMusic$ = useStore(activeMusic); 
    const isMusicNeededOnBackground$ = useStore(isMusicNeededOnBackground);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    useEffect(() => {
        if (audioRef.current && isMusicNeededOnBackground$) {
            audioRef.current.currentTime = activeMusic$.currentTime;
            audioRef.current.play();
        }
    }, [activeMusic$]);

    if (activeMusic$ && isMusicNeededOnBackground$) {
        return (
            <MusicControlBlockView
                audioRef={audioRef}
                activeMusic={activeMusic$}
            />
        )
    } else {
        return null;
    }
}