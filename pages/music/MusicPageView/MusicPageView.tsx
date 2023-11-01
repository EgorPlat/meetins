import { BsPlay } from 'react-icons/bs';
import s from './MusicPageView.module.scss';
import { getTimerFromSeconds } from '../../../global/helpers/helper';
import { IActiveMusic } from '../../../global/interfaces/music';
import { PiMusicNotesPlus } from 'react-icons/pi';
import { MusicPlayer } from '../../../global/components/MusicPlayer/MusicPlayer';
import CustomModal from '../../../components-ui/CustomModal/CustomModal';
import AddMusic from '../../../global/Forms/AddMusic/Index';

interface IMusicPageViewProps {
    addMusicModal: boolean,
    selectedMusic: string,
    selectedMusicInfo: { currentTime: number, duration: number },
    handleInithialMusic: (activeMusic: IActiveMusic) => void,
    handleStopMusic: () => void,
    handleSwapMusicModal: (status: boolean) => void
}
export default function MusicPageView({
    addMusicModal,
    selectedMusic,
    selectedMusicInfo,
    handleInithialMusic,
    handleStopMusic,
    handleSwapMusicModal
}: IMusicPageViewProps) {
    return (
        <div className={s.music}>
            <div className={s.musicSearch}>
                <input className={s.musicSearchInp} type='text' placeholder='Введите название музыкальной композиции' />
                <button className={s.musicSearchBtn} >Искать</button>
            </div>
            <div className={s.addMusic}>
                Хотите добавить свою композицию?
                <PiMusicNotesPlus
                    className={s.controls}
                    fontSize={25}
                    onClick={() => handleSwapMusicModal(true)}
                />
            </div>
            <div className={s.musicContent}>
                <div className={s.musicList}>
                {
                    [1, 2, 3].map(el => {
                        return (
                            <MusicPlayer
                                key={el}
                                selectedMusic={String(el)}
                                selectedMusicInfo={selectedMusicInfo}
                                isMusicSelected={selectedMusic === String(el)}
                                handleStartMusic={handleInithialMusic}
                                handleStopMusic={handleStopMusic}
                            />
                        )
                    })
                }
                </div>
                <div className={s.songers}>
                    Статистика исполнителей
                    {
                        [1,2,3].map(el => (
                            <div className={s.songer}>
                                <a href='#' className={s.name}>Blackway, Black Caviar - </a>
                                <span>Прослушиваний 1.295 - </span>
                                <span className={s.mapBtn}>Посмотреть карту </span>
                            </div>
                        ))
                    }
                    <div className={s.info}>
                        <span className={s.termin}>Карта исполнителя</span> - это специальный виджет, который служит для того, чтобы
                        узнать в каком регионе мира чаще слушают выбранного Вами исполнителя. Это функция поможет
                        Вам найти сторонников и любителей схожего с Вашим стиля музыки и начать с ним общаться!
                    </div>
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