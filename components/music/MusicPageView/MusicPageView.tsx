
import { TfiStatsUp } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { IMusicAuthors, IMusicAuthorsStatistics, IMatch } from "@/entities/music";
import { baseURL } from "@/global/store/store";
import { MusicPlayer } from "@/widgets/MusicPlayer/MusicPlayer";
import Link from "next/link";
import s from "./MusicPageView.module.scss";

interface IMusicPageViewProps {
    musicList: IMusicAuthors[],
    authorsStatistic: IMusicAuthorsStatistics[],
    handleSwapMusicModal: (status: boolean) => void,
    handleOpenMyStatistic: () => void,
    handleShowPopularityInfo: () => void,
    setSearchMusic: (value: string) => void,
    matchesList: IMatch[],
    activeMusicId: number,
}
export default function MusicPageView({
    handleSwapMusicModal,
    musicList,
    authorsStatistic,
    handleOpenMyStatistic,
    setSearchMusic,
    handleShowPopularityInfo,
    matchesList,
    activeMusicId
}: IMusicPageViewProps) {   
    
    const { t } = useTranslation();

    return (
        <div className={s.music}>
            <div className={s.addMusic}>
                <span onClick={() => handleSwapMusicModal(true)}>{t("Добавить свою композицию")}?</span>
                <TfiStatsUp className={s.myStatistic} fontSize={28} onClick={handleOpenMyStatistic} />
            </div>
            <div className={s.musicSearch}>
                <input 
                    className={s.musicSearchInp} 
                    type='text' 
                    placeholder={t("Введите псевдоним автора")}
                    onChange={(e) => setSearchMusic(e.target.value)}
                />
            </div>
            <div className={s.musicContent}>
                <div className={s.musicList}>
                    {
                        musicList?.map(author => {
                            return author.compositions.map(music => {
                                return (
                                    <MusicPlayer
                                        isStopNeeded={activeMusicId !== music.id}
                                        key={music.id}
                                        musicInfo={music}
                                        authorInfo={author}
                                    />
                                )
                            })
                        })
                    }
                </div>
                <div className={s.moreInfo}>
                    <div className={s.title}>{t("Статистика исполнителей")}:</div>
                    <div className={s.songers}>
                        {
                            authorsStatistic?.map(el => (
                                <div className={s.songer} key={el.id}>
                                    <a href='#' className={s.name}>{el.name} - </a>
                                    <span>{t("Прослушивания")} {el.playsNumber} - </span>
                                    <span className={s.mapBtn} onClick={handleShowPopularityInfo}>Узнать где популярен? </span>
                                </div>
                            ))
                        }
                    </div>
                    <div className={s.matches}>
                        <div className={s.title}>{t("Ваш вкус совпадает с пользователями")}:</div>
                        <div className={s.desk}>
                            {
                                matchesList?.map(el => (
                                    <div className={s.card} key={el.login}>
                                        <div className={s.topContent}>
                                            <div 
                                                className={s.avatar}
                                                style={{ backgroundImage: `url(${baseURL + el.avatar})` }}
                                            ></div>
                                            <div className={s.title}>
                                                {el.name}
                                                <div className={s.matchData}>
                                                    {t("Совпадение")}: <span className={s.count}>100%</span>
                                                    <Link href={`/profile/${el.login}`} className={s.userLink}>
                                                        {t("Посетить")}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={s.bottomContent}>
                                            <div className={s.compositions}>
                                                <div>1 - Blackway, Black Caviar - Whats up danger</div>
                                                <div>2 - Tommee Profitt - I see who you are...</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}