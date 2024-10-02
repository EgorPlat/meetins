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
        { currentTime: 0, duration: 1 }
    );
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const handleStartPlaying = () => {
        setIsPlaying(true);
        if (audioRef && audioRef.current) {
            audioRef.current.play();
        }
    };
    
    const handleStopPlaying = () => {
        setIsPlaying(false);
        if (audioRef && audioRef.current) {
            audioRef.current.pause();
        }
    };

    const handleUpdateTimeData = () => {
        if (audioRef && audioRef.current) {
            const { currentTime, duration } = audioRef.current;
            console.log(currentTime, duration);
            if (currentTime !== duration) {
                if (duration !== Infinity) {
                    setTimeData({ currentTime, duration });
                }
            } else {
                setTimeData({ currentTime: 0, duration });
                setIsPlaying(false);
            }
        }
    };

    return (
        <div className={s.customAudioTrack}>
            <audio
                onTimeUpdate={handleUpdateTimeData}
                ref={audioRef}
                src={src}
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