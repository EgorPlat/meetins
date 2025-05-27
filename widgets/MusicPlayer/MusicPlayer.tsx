import { getTimerFromSeconds } from "../../shared/helpers/helper";
import { IMusic, IMusicAuthors } from "../../entities/music";
import { baseURL } from "../../global/store/store";
import { useEffect, useRef, useState } from "react";
import { activeMusicId, setActiveMusic, setActiveMusicId } from "../../global/store/music_model";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { useUnit } from "effector-react";
import s from "./MusicPlayer.module.scss";

export const MusicPlayer = (props: {
    musicInfo: IMusic,
    authorInfo: IMusicAuthors,
    isStopNeeded: boolean
}) => {
    
    const activeMusicId$ = useUnit(activeMusicId);
    const [isMusicSelected, setIsMusicSelected] = useState<boolean>(false);
    const [musicTimeData, setMusicTimeData] = useState<{ currentTime: number, duration: number }>({ currentTime: 0, duration: 0 });
    const musicFullTimer = getTimerFromSeconds(+musicTimeData?.duration);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleTimeUpdate = (audio) => {
        if (audioRef.current) {
            setActiveMusic({
                title: props.musicInfo.title,
                image: baseURL + props.musicInfo.imageSrc,
                currentTime: audio.target.currentTime,
                duration: audio.target.duration,
                src: baseURL + props.musicInfo.audioSrc,
                id: String(props.musicInfo.id),
                authorId: props.authorInfo.authorId
            });
            setMusicTimeData({
                currentTime: audio.target.currentTime,
                duration: audio.target.duration
            });
        }
    };

    const handleStartMusic = () => {
        setActiveMusicId(props.musicInfo.id);
        if (audioRef.current) {
            setIsMusicSelected(true);
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
        }
    };

    const handleStopMusic = () => {
        if (audioRef.current) {
            setIsMusicSelected(false);
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
            audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
            setActiveMusic(null);
            setActiveMusicId(null);
        }
    };

    useEffect(() => {
        return () => {
            audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
        }
    }, []);

    useEffect(() => {
        if (props.isStopNeeded) {
            handleStopMusic();
        }
    }, [props.isStopNeeded]);

    return (
        <div className={s.musicContentElement}>
            <audio src={baseURL + props.musicInfo.audioSrc} ref={audioRef} loop />
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
                        isMusicSelected ?
                            <progress 
                                className={s.musicContentElementInfoProgressElem}
                                value={musicTimeData?.currentTime || 0} 
                                max={musicTimeData?.duration || 0}
                            ></progress>
                            : <progress
                                className={s.musicContentElementInfoProgressElem}
                                value={0} 
                                max={1}
                            ></progress>
                    }
                    {
                        isMusicSelected &&
                        <span>
                            {getTimerFromSeconds(+musicTimeData?.currentTime) 
                        + "/" + 
                        musicFullTimer
                            }
                        </span>
                    }
                </div>
            </div>
            <div className={s.musicContentElementInfoActions} >
                {
                    !isMusicSelected 
                        ?
                        <FaPlay
                            className={s.controls}
                            fontSize={20}
                            onClick={handleStartMusic}
                        />
                        : 
                        <FaPause
                            className={s.controls}
                            fontSize={20}
                            onClick={handleStopMusic}
                        />
                }
            </div>
        </div>
    )
}