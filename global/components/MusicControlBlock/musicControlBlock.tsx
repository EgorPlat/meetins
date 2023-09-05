import { useStore } from "effector-react"
import { MusicControlBlockView } from "./MusicControlBlockView/MusicControlBlockView"
import { activeMusic, setActiveMusicTimeData } from "../../store/music_model"
import { useEffect, useRef } from "react";

export const MusicControlBlock = () => {

    const activeMusic$ = useStore(activeMusic);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleTimeUpdate = (audio) => {
        setActiveMusicTimeData({
            currentTime: audio.target.currentTime,
            duration: audio.target.duration
        })
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            audioRef.current.addEventListener("timeupdate", handleTimeUpdate)
        }
        return () => {
            audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        }
    }, [activeMusic$]);

    return (
        <MusicControlBlockView
            audioRef={audioRef}
            activeMusic={activeMusic$}
        />
    )
}