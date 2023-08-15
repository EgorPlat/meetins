import { useEffect, useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MusicPageView from "./MusicPageView/MusicPageView";

export default function Music() {

    const [selectedMusic, setSelectedMusic] = useState<string>();
    const [selectedMusicInfo, setSelectedMusicInfo] = useState<{ currentTime: number, duration: number }>(null);

    const handleTimeUpdate = (audio: any) => {
        setSelectedMusicInfo({ duration: audio?.target?.duration, currentTime: audio?.target?.currentTime });
    };
    const handleInithialMusic = (audioId: string) => {
        setSelectedMusic(audioId);
    };

    useEffect(() => {
        const audio = document.getElementById(selectedMusic);
        audio?.addEventListener('timeupdate', handleTimeUpdate);
        
        return () => {
            audio?.removeEventListener('timeupdate', handleTimeUpdate);
            const audioTags = document.querySelectorAll("audio");
            audioTags.forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        };
    }, [selectedMusic]);

    return (
        <PageContainer>
            <MusicPageView
                selectedMusic={selectedMusic}
                selectedMusicInfo={selectedMusicInfo}
                handleInithialMusic={handleInithialMusic}
            />
        </PageContainer>
    )
}