import { BsPlay } from "react-icons/bs";
import { getTimerFromSeconds } from "../../shared/helpers/helper";
import s from "./MusicPlayer.module.scss";
import { IMusic, IMusicAuthors } from "../../entities/music";
import { LuStretchVertical } from "react-icons/lu";
import { baseURL } from "../../global/store/store";
import { useEffect, useRef, useState } from "react";
import { setActiveMusic, setActiveMusicId, setIsMusicNeededOnBackground } from "../../global/store/music_model";

export const MusicPlayer = (props: {
    musicInfo: IMusic,
    authorInfo: IMusicAuthors,
    isStopNeeded: boolean
}) => {
    
    const [isMusicSelected, setIsMusicSelected] = useState<boolean>(false);
    const [musicTimeData, setMusicTimeData] = useState<{ currentTime: number, duration: number }>({ currentTime: 0, duration: 0 });
    const musicFullTimer = getTimerFromSeconds(+musicTimeData?.duration);
    const audioRef = useRef<HTMLAudioElement>();

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
        setIsMusicNeededOnBackground(false);
        if (audioRef.current) {
            setIsMusicSelected(true);
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
        }
    };

    const handleStopMusic = () => {
        setIsMusicSelected(false);
        audioRef.current.currentTime = 0;
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        setActiveMusic(null);
    };

    useEffect(() => {
        return () => {
            setIsMusicNeededOnBackground(true);
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
                        <BsPlay
                            className={s.controls}
                            fontSize={30}
                            onClick={handleStartMusic}
                        />
                        : 
                        <LuStretchVertical
                            className={s.controls}
                            fontSize={22}
                            onClick={handleStopMusic}
                        />
                }
            </div>
        </div>
    )
}