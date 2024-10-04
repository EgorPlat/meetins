import s from "./CustomAudioTrack.module.scss";
import { IoIosPlay } from "react-icons/io";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { useRef, useState } from "react";

export default function CustomAudioTrack(props) {

    const {
        src,
        controls,
        autoPlay,
        muted,
        preload,
        ...restProps
    } = props;

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [timeData, setTimeData] = useState<{ currentTime: number, duration: number }>(
        { currentTime: 0, duration: 0 }
    );
    const audioRef = useRef<HTMLAudioElement>();
    
    const handleUpdateTimeData = (audio) => {
        if (audioRef.current) {
            setTimeData({ 
                currentTime: audio.target.currentTime, 
                duration: audio.target.duration 
            });
            if (audio.target.currentTime === audio.target.duration) {
                setTimeData({ 
                    currentTime: 0, 
                    duration: 0 
                });
                setIsPlaying(false);
            }
        }
    };

    const handleStartPlaying = () => {
        if (audioRef.current) {
            setIsPlaying(true);
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            audioRef.current.addEventListener("timeupdate", handleUpdateTimeData);
        }
    };
    
    const handleStopPlaying = () => {
        if (audioRef.current) {
            setIsPlaying(false);
            audioRef.current.currentTime = 0;
            audioRef.current.pause();
            audioRef.current.removeEventListener("timeupdate", handleUpdateTimeData);
        }
    };

    return (
        <div className={s.customAudioTrack}>
            <audio
                src={src}
                ref={audioRef}
                controls={controls}
                autoPlay={autoPlay}
                muted={muted}
                preload={preload}
                {...restProps}
            />
            <progress className={s.fakeAudio} value={timeData.currentTime} max={timeData.duration}></progress>
            {
                isPlaying
                    ? <TbPlayerPauseFilled onClick={handleStopPlaying} fontSize={30} />
                    : <IoIosPlay onClick={handleStartPlaying} fontSize={30} />
            }
        </div>
    )
}