import { useEffect, useState } from "react";
import {
    getAllMusic,
    getAuthorsStatistic,
    authorsStatistic,
    musicList,
    setMusicList,
    getMatchesList,
    matchesList,
    activeMusicId
} from "../../global/store/music_model";
import { useStore } from "effector-react";
import CustomModal from "../../global/components-ui/CustomModal/CustomModal";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MusicPageView from "./components/MusicPageView/MusicPageView";
import CustomStepper from "../../global/components-ui/CustomStepper/CustomStepper";
import useDebounce from "../../global/hooks/useDebounce";
import dynamic from "next/dynamic";
import CustomLoader from "../../global/components-ui/CustomLoader/CustomLoader";

const StatsView = dynamic(() => import("./components/StatsView/StatsView"), { loading: () => <CustomLoader />});
const StatsTimeView = dynamic(() => import("./components/StatsTimeView/StatsTimeView"), { loading: () => <CustomLoader />});
const StatsGeoView = dynamic(() => import("./components/StatsGeoView/StatsGeoView"), { loading: () => <CustomLoader />});

export default function Music() {

    const [addMusicModal, setAddMusicModal] = useState<boolean>(false);
    const [showMyStatistic, setShowMyStatistic] = useState<boolean>(false);
    const [searchMusic, setSearchMusic] = useState<string>("");
    const debouncedSearchMusic = useDebounce(searchMusic, 300);
    const musicList$ = useStore(musicList);
    const authorsStatistic$ = useStore(authorsStatistic);
    const matchesList$ = useStore(matchesList);
    const activeMusicId$ = useStore(activeMusicId);

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
        if (debouncedSearchMusic.length === 0) {
            getAllMusic()
        } else {
            setMusicList(musicList$.filter(el => el.name.toLowerCase().includes(debouncedSearchMusic.toLowerCase())));
        }
    }, [debouncedSearchMusic]);

    return (
        <PageContainer>
            <>
                <MusicPageView
                    matchesList={matchesList$}
                    setSearchMusic={setSearchMusic}
                    addMusicModal={addMusicModal}
                    handleSwapMusicModal={handleSwapMusicModal}
                    musicList={musicList$}
                    authorsStatistic={authorsStatistic$}
                    handleOpenMyStatistic={handleOpenMyStatistic}
                    activeMusicId={activeMusicId$}
                />
                <CustomModal
                    isDisplay={showMyStatistic}
                    changeModal={setShowMyStatistic}
                    actionConfirmed={setShowMyStatistic}
                    typeOfActions="none"
                    title="Статистика"
                >
                    <CustomStepper
                        steps={[
                            { title: "Основное", component: StatsView },
                            { title: "Вычисляемое", component: StatsTimeView },
                            { title: "Гео-данные", component: StatsGeoView }
                        ]}
                    />
                </CustomModal>
            </>
        </PageContainer>
    )
}