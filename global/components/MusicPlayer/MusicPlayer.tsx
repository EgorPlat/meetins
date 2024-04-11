import { BsPlay } from 'react-icons/bs';
import { getTimerFromSeconds } from '../../helpers/helper';
import s from './MusicPlayer.module.scss';
import { IActiveMusic, IMusic, IMusicAuthors } from '../../interfaces/music';
import { LuStretchVertical } from 'react-icons/lu';
import { baseURL } from '../../store/store';

export const MusicPlayer = (props: {
    selectedMusicInfo: { currentTime: number, duration: number },
    isMusicSelected: boolean,
    handleStartMusic: (music: IActiveMusic) => void,
    handleStopMusic: () => void,
    musicInfo: IMusic,
    authorInfo: IMusicAuthors
}) => {
    const musicFullTimer = getTimerFromSeconds(+props.selectedMusicInfo?.duration);

    return (
        <div className={s.musicContentElement}>
            <div className={s.musicContentElementLogo}>
                <img 
                    src={baseURL + props.musicInfo.imageSrc}
                    width="100%"
                    height="100%"
                />
            </div>
            <div className={s.musicContentElementInfo}>
                <div className={s.musicContentElementInfoTitle}>
                    {props.musicInfo.title} 
                    <span style={{color: "gray"}}> (3:36) </span> 
                    <span className={s.authorName}>{props.authorInfo.name} </span>
                </div>
                <div>
                    {props.musicInfo.description}
                </div>
                <div className={s.musicContentElementInfoProgress}>
                    {
                        props.isMusicSelected ?
                        <progress 
                            className={s.musicContentElementInfoProgressElem}
                            value={props.selectedMusicInfo?.currentTime || 0} 
                            max={props.selectedMusicInfo?.duration || 0}
                        ></progress>
                        : <progress
                            className={s.musicContentElementInfoProgressElem}
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
                        className={s.controls}
                        fontSize={30}
                        onClick={() => props.handleStartMusic({
                            id: String(props.musicInfo.id),
                            title: 'test',
                            src: baseURL + props.musicInfo.audioSrc,
                            image: baseURL + props.musicInfo.imageSrc,
                            duration: props.selectedMusicInfo?.duration,
                            currentTime: props.selectedMusicInfo?.currentTime,
                            authorId: props.authorInfo.authorId
                        })}
                    />
                    : 
                    <LuStretchVertical
                        className={s.controls}
                        fontSize={22}
                        onClick={() => props.handleStopMusic()}
                    />
                }
            </div>
        </div>
    )
}