import { BsPlay } from 'react-icons/bs';
import { getTimerFromSeconds } from '../../helpers/helper';
import s from './MusicPlayer.module.scss';
import { IActiveMusic } from '../../interfaces/music';
import { LuStretchVertical } from 'react-icons/lu';
import { setActiveMusic } from '../../store/music_model';

export const MusicPlayer = (props: {
    selectedMusic: string,
    selectedMusicInfo: { currentTime: number, duration: number },
    isMusicSelected: boolean,
    handleStartMusic: (music: IActiveMusic) => void,
    handleStopMusic: () => void
}) => {

    const musicFullTimer = getTimerFromSeconds(+props.selectedMusicInfo?.duration);

    return (
        <div className={s.musicContentElement}>
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
                        props.isMusicSelected ?
                        <progress 
                            value={props.selectedMusicInfo?.currentTime} 
                            max={props.selectedMusicInfo?.duration}
                        ></progress>
                        : <progress 
                            value={0} 
                            max={1}
                        ></progress>
                    }
                    {
                        props.isMusicSelected &&
                        <span>
                        {getTimerFromSeconds(+props.selectedMusicInfo?.currentTime) 
                        + '/' + 
                        musicFullTimer
                        }
                    </span>
                    }
                </div>
            </div>
            <div className={s.musicContentElementInfoActions} >
                {
                    !props.isMusicSelected 
                    ?
                    <BsPlay 
                        fontSize={30}
                        onClick={() => props.handleStartMusic({
                            id: String(props.selectedMusic),
                            title: 'test',
                            src: '/danger.mp3',
                            image: 'https://melodicc.com/wp-content/uploads/2021/09/Whats-Up-Danger.jpg',
                            duration: props.selectedMusicInfo?.duration,
                            currentTime: props.selectedMusicInfo?.currentTime
                        })}
                    />
                    : 
                    <LuStretchVertical 
                        fontSize={22}
                        onClick={() => props.handleStopMusic()}
                    />
                }
            </div>
        </div>
    )
}