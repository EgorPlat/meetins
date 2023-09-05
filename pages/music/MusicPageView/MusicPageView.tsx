import { BsPlay } from 'react-icons/bs';
import s from './MusicPageView.module.scss';
import { getTimerFromSeconds } from '../../../global/helpers/helper';
import { IActiveMusic } from '../../../global/interfaces/music';

interface IMusicPageViewProps {
    selectedMusic: string,
    selectedMusicInfo: { currentTime: number, duration: number },
    handleInithialMusic: (activeMusic: IActiveMusic) => void
}
export default function MusicPageView({
    selectedMusic,
    selectedMusicInfo,
    handleInithialMusic
}: IMusicPageViewProps) {
    return (
        <div className={s.music}>
            <div className={s.musicSearch}>
                <input className={s.musicSearchInp} type='text' placeholder='Введите название музыкальной композиции' />
                <button className={s.musicSearchBtn} >Искать</button>
            </div>
            <div className={s.musicContent}>
                <div className={s.musicContentTitle}>Текущий плейлист</div>
                {
                    [1, 2, 3].map(el => {
                        const musicFullTimer = getTimerFromSeconds(+selectedMusicInfo?.duration);
                        return (
                            <div className={s.musicContentElement} key={el}>
                                <div className={s.musicContentElementLogo}>
                                    <img 
                                        src="https://melodicc.com/wp-content/uploads/2021/09/Whats-Up-Danger.jpg"
                                        width="100%"
                                        height="100%"
                                    />
                                </div>
                                <div className={s.musicContentElementInfo}>
                                    <div className={s.musicContentElementInfoTitle}>
                                        What's up danger <span style={{color: "gray"}}>(3:36)</span> 
                                    </div>
                                    <div className={s.musicContentElementInfoAuthor}>
                                        Blackway, Black Caviar
                                    </div>
                                    <div className={s.musicContentElementInfoProgress}>
                                        {
                                            selectedMusic === String(el) ?
                                            <progress 
                                                value={selectedMusicInfo?.currentTime} 
                                                max={selectedMusicInfo?.duration}
                                            ></progress>
                                            : <progress 
                                                value={0} 
                                                max={1}
                                            ></progress>
                                        }
                                        {
                                            selectedMusic === String(el) &&
                                            <span>
                                            {getTimerFromSeconds(+selectedMusicInfo?.currentTime) 
                                            + '/' + 
                                            musicFullTimer
                                            }
                                        </span>
                                        }
                                    </div>
                                </div>
                                <div className={s.musicContentElementInfoActions} >
                                    <BsPlay fontSize={30}
                                        onClick={() => handleInithialMusic({
                                            id: String(el),
                                            title: 'test',
                                            src: '/danger.mp3',
                                            image: 'https://melodicc.com/wp-content/uploads/2021/09/Whats-Up-Danger.jpg',
                                            duration: selectedMusicInfo?.duration,
                                            currentTime: selectedMusicInfo?.currentTime
                                        })}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}