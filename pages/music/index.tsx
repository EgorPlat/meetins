import { useEffect, useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MusicPageView from "./MusicPageView/MusicPageView";
import { IActiveMusic } from "../../global/interfaces/music";
import { setActiveMusic, setActiveMusicCurrentTime } from "../../global/store/music_model";

export default function Music() {

    const [selectedMusic, setSelectedMusic] = useState<string>();
    const [selectedMusicInfo, setSelectedMusicInfo] = useState<{ currentTime: number, duration: number }>({ currentTime: 0, duration: 0});

    const handleTimeUpdate = (audio: any) => {
        setSelectedMusicInfo({ duration: audio?.target?.duration, currentTime: audio?.target?.currentTime });
        setActiveMusicCurrentTime(audio?.target?.currentTime);
    };
    const handleInithialMusic = (activeMusic: IActiveMusic) => {
        setSelectedMusic(activeMusic.id);
        setActiveMusic(activeMusic);
    };

    useEffect(() => {
        const audio = document.getElementById(selectedMusic);
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
        }
        return () => {
            audio?.removeEventListener('timeupdate', handleTimeUpdate);
            /*const audioTags = document.querySelectorAll("audio");
            audioTags?.forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });*/
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