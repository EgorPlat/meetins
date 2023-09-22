import { useEffect, useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MusicPageView from "./MusicPageView/MusicPageView";
import { IActiveMusic } from "../../global/interfaces/music";
import { activeMusicTimeData, setActiveMusic, setActiveMusicCurrentTime, setActiveMusicTimeData } from "../../global/store/music_model";
import { useStore } from "effector-react";

export default function Music() {

    const [addMusicModal, setAddMusicModal] = useState<boolean>(false);
    const [selectedMusic, setSelectedMusic] = useState<string>();
    const activeMusicTimeData$ = useStore(activeMusicTimeData);

    const handleInithialMusic = (activeMusic: IActiveMusic) => {
        setSelectedMusic(activeMusic.id);
        setActiveMusic(activeMusic);
    };
    const handleStopMusic = () => {
        setSelectedMusic(null);
        setActiveMusic(null);
        setActiveMusicTimeData(null);
    }
    const handleSwapMusicModal = (status: boolean) => {
        setAddMusicModal(() => status);
    }
    return (
        <PageContainer>
            <MusicPageView
                selectedMusic={selectedMusic}
                selectedMusicInfo={activeMusicTimeData$}
                handleInithialMusic={handleInithialMusic}
                handleStopMusic={handleStopMusic}
                addMusicModal={addMusicModal}
                handleSwapMusicModal={handleSwapMusicModal}
            />
        </PageContainer>
    )
}