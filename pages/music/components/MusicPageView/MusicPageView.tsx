import { BsPlay } from 'react-icons/bs';
import s from './MusicPageView.module.scss';
import { TfiStatsUp } from "react-icons/tfi";
import { IActiveMusic, IMatch, IMusicAuthors, IMusicAuthorsStatistics } from '../../../../global/interfaces/music';
import { PiMusicNotesPlus } from 'react-icons/pi';
import { MusicPlayer } from '../../../../global/components/MusicPlayer/MusicPlayer';
import CustomModal from '../../../../components-ui/CustomModal/CustomModal';
import AddMusic from '../../../../global/forms/AddMusic/Index';
import { baseURL } from '../../../../global/store/store';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface IMusicPageViewProps {
    addMusicModal: boolean,
    selectedMusicId: string,
    selectedMusicInfo: { currentTime: number, duration: number },
    musicList: IMusicAuthors[],
    authorsStatistic: IMusicAuthorsStatistics[],
    handleStartMusic: (activeMusic: IActiveMusic) => void,
    handleStopMusic: () => void,
    handleSwapMusicModal: (status: boolean) => void,
    handleOpenMyStatistic: () => void,
    setSearchMusic: (value: string) => void,
    matchesList: IMatch[]
}
export default function MusicPageView({
    addMusicModal,
    selectedMusicId,
    selectedMusicInfo,
    handleStartMusic,
    handleStopMusic,
    handleSwapMusicModal,
    musicList,
    authorsStatistic,
    handleOpenMyStatistic,
    setSearchMusic,
    matchesList
}: IMusicPageViewProps) {   
    
    const { t } = useTranslation();

    return (
        <div className={s.music}>
            <div className={s.addMusic}>
                <span>{t('Хотите добавить свою композицию?')}</span>
                <PiMusicNotesPlus
                    className={s.controls}
                    fontSize={25}
                    onClick={() => handleSwapMusicModal(true)}
                />
                <TfiStatsUp className={s.myStatistic} fontSize={28} onClick={handleOpenMyStatistic} />
            </div>
            <div className={s.musicSearch}>
                <input 
                    className={s.musicSearchInp} 
                    type='text' 
                    placeholder={t('Введите псевдоним автора')}
                    onChange={(e) => setSearchMusic(e.target.value)}
                />
                <button className={s.musicSearchBtn}>{t('Искать')}</button>
            </div>
            <div className={s.musicContent}>
                <div className={s.musicList}>
                {
                    musicList?.map(author => {
                        return author.compositions.map(music => {
                            return (
                                <MusicPlayer
                                    key={music.id}
                                    selectedMusicInfo={selectedMusicInfo}
                                    isMusicSelected={selectedMusicId === String(music.id)}
                                    handleStartMusic={handleStartMusic}
                                    handleStopMusic={handleStopMusic}
                                    musicInfo={music}
                                    authorInfo={author}
                                />
                            )
                        })
                    })
                }
                </div>
                <div className={s.songers}>
                    {t('Статистика исполнителей')}
                    {
                        authorsStatistic?.map(el => (
                            <div className={s.songer} key={el.id}>
                                <a href='#' className={s.name}>{el.name} - </a>
                                <span>{t('Прослушивания')} {el.playsNumber} - </span>
                                <span className={s.mapBtn}>Узнать где популярен? </span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={s.matches}>
                <div className={s.title}>{t('Ваш вкус совпадает с другими пользователями')}</div>
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
                                            {t('Совпадение')}: <span className={s.count}>100%</span>
                                            <Link href={`/profile/${el.login}`} className={s.userLink}>
                                                {t('Посетить')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.bottomContent}>
                                    <div className={s.compositions}>
                                        <div>1 - Blackway, Black Caviar - What's up danger</div>
                                        <div>2 - Tommee Profitt - I see who you are...</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <CustomModal 
                isDisplay={addMusicModal} 
                changeModal={(status) => handleSwapMusicModal(status)} 
                actionConfirmed={() => handleSwapMusicModal(true)}
                title='Добавить новую композицию'
                typeOfActions="none"
            >
                <AddMusic />
            </CustomModal>
        </div>
    )
}