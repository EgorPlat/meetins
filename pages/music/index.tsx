import { useEffect, useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MusicPageView from "./components/MusicPageView/MusicPageView";
import { IActiveMusic, IMusic } from "../../global/interfaces/music";
import { activeMusicTimeData, getAllMusic, getAuthorsStatistic, authorsStatistic, musicList, setActiveMusic, setActiveMusicCurrentTime, setActiveMusicTimeData, addPlaysToComposition, setMusicList, getMatchesList, matchesList } from "../../global/store/music_model";
import { useStore } from "effector-react";
import CustomModal from "../../components-ui/CustomModal/CustomModal";
import StatsView from "./components/StatsView/StatsView";

export default function Music() {

    const [addMusicModal, setAddMusicModal] = useState<boolean>(false);
    const [showMyStatistic, setShowMyStatistic] = useState<boolean>(false);
    const [selectedMusicId, setSelectedMusicId] = useState<string>();
    const [searchMusic, setSearchMusic] = useState<string>("");
    const activeMusicTimeData$ = useStore(activeMusicTimeData);
    const musicList$ = useStore(musicList);
    const authorsStatistic$ = useStore(authorsStatistic);
    const matchesList$ = useStore(matchesList);

    const handleStartMusic = (activeMusic: IActiveMusic) => {
        addPlaysToComposition({ authorId: activeMusic.authorId, trackId: activeMusic.id });
        setSelectedMusicId(activeMusic.id);
        setActiveMusic(activeMusic); 
    };
    const handleStopMusic = () => {
        setSelectedMusicId(null);
        setActiveMusic(null);
        setActiveMusicTimeData(null);
    }
    const handleSwapMusicModal = (status: boolean) => {
        setAddMusicModal(() => status);
    }
    const handleOpenMyStatistic = () => {
        setShowMyStatistic(true);
    }

    useEffect(() => {
        getAllMusic();
        getAuthorsStatistic();
        getMatchesList();
    }, []);
    
    useEffect(() => {
        if (searchMusic.length === 0) {
            getAllMusic()
        } else {
            setMusicList(musicList$.filter(el => el.name.includes(searchMusic)));
        }
    }, [searchMusic]);

    return (
        <PageContainer>
            <>
                <MusicPageView
                    matchesList={matchesList$}
                    selectedMusicId={selectedMusicId}
                    selectedMusicInfo={activeMusicTimeData$}
                    handleStartMusic={handleStartMusic}
                    handleStopMusic={handleStopMusic}
                    setSearchMusic={setSearchMusic}
                    addMusicModal={addMusicModal}
                    handleSwapMusicModal={handleSwapMusicModal}
                    musicList={musicList$}
                    authorsStatistic={authorsStatistic$}
                    handleOpenMyStatistic={handleOpenMyStatistic}
                />
                <CustomModal
                    isDisplay={showMyStatistic}
                    changeModal={setShowMyStatistic}
                    actionConfirmed={setShowMyStatistic}
                    typeOfActions="none"
                    title="Статистика"
                >
                    <StatsView />
                </CustomModal>
            </>
        </PageContainer>
    )
}