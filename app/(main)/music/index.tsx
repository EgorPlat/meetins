"use client";
import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { musicList, authorsStatistic, matchesList, activeMusicId, getAllMusic, getAuthorsStatistic, getMatchesList, setMusicList } from "@/global/store/music_model";
import { addNotification } from "@/global/store/notifications_model";
import useDebounce from "@/shared/hooks/useDebounce";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import CustomModal from "@/shared/ui/CustomModal/CustomModal";
import CustomStepper from "@/shared/ui/CustomStepper/CustomStepper";
import MusicPageView from "./components/MusicPageView/MusicPageView";
import dynamic from "next/dynamic";

const AddMusic = dynamic(() => import("../../../features/forms/AddMusic/Index"), { loading: () => <CustomLoader />, ssr: false })
const StatsView = dynamic(() => import("./components/StatsView/StatsView"), { loading: () => <CustomLoader />, ssr: false });
const StatsTimeView = dynamic(() => import("./components/StatsTimeView/StatsTimeView"), { loading: () => <CustomLoader />, ssr: false });
const StatsGeoView = dynamic(() => import("./components/StatsGeoView/StatsGeoView"), { loading: () => <CustomLoader />, ssr: false});

export default function Music() {

    const [addMusicModal, setAddMusicModal] = useState<boolean>(false);
    const [showMyStatistic, setShowMyStatistic] = useState<boolean>(false);
    const [searchMusic, setSearchMusic] = useState<string>("");
    const debouncedSearchMusic = useDebounce(searchMusic, 300);
    const musicList$ = useUnit(musicList);
    const authorsStatistic$ = useUnit(authorsStatistic);
    const matchesList$ = useUnit(matchesList);
    const activeMusicId$ = useUnit(activeMusicId);

    const handleSwapMusicModal = (status: boolean) => {
        setAddMusicModal(() => status);
    };
    const handleOpenMyStatistic = () => {
        setShowMyStatistic(true);
    };
    const handleShowPopularityInfo = () => {
        addNotification({
            type: "info",
            text: "Данных пока нет",
            time: 3000,
            textColor: "white"
        });
    };

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
        <>
            <MusicPageView
                matchesList={matchesList$}
                setSearchMusic={setSearchMusic}
                handleSwapMusicModal={handleSwapMusicModal}
                musicList={musicList$}
                authorsStatistic={authorsStatistic$}
                handleOpenMyStatistic={handleOpenMyStatistic}
                activeMusicId={activeMusicId$}
                handleShowPopularityInfo={handleShowPopularityInfo}
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
            <CustomModal 
                isDisplay={addMusicModal} 
                changeModal={(status) => handleSwapMusicModal(status)} 
                actionConfirmed={() => handleSwapMusicModal(true)}
                title='Добавить новую композицию'
                typeOfActions="none"
            >
                <AddMusic />
            </CustomModal>
        </>
    )
}