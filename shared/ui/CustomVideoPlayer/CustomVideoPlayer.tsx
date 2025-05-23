"use client";
import { useRef, useState } from "react";
import s from "./CustomVideoPlayer.module.scss";
import { IoIosPlay } from "react-icons/io";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { getTimeDataString } from "../../helpers/helper";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegPauseCircle } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";

interface ICustomVideoPlayerProps {
    src: string,
    width?: string,
    height?: string
}

export default function CustomVideoPlayer({ 
    src,
    width,
    height
}: ICustomVideoPlayerProps) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [timeData, setTimeData] = useState<{ currentTime: number, duration: number }>({ currentTime: 0, duration: 0 });
    const videoFullTimer = getTimeDataString(timeData.currentTime, timeData.duration);

    const handleStartPlaying = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play();
        };
    };

    const handleStopPlaying = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
        };
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            if (videoRef.current.currentTime === videoRef.current.duration) {
                setIsPlaying(false);
                return;
            };
            setTimeData({
                currentTime: Math.floor(videoRef.current.currentTime),
                duration: Math.floor(videoRef.current.duration)
            });
        };
    };

    return (
        <div className={s.customVideoPlayer} style={{ width: width, height: height }}>
            <video src={src} ref={videoRef} onTimeUpdate={handleTimeUpdate} />
            <div className={s.controls}>
                {
                    isPlaying
                        ? <TbPlayerPauseFilled onClick={handleStopPlaying} fontSize={20} />
                        : <IoIosPlay onClick={handleStartPlaying} fontSize={20} />
                }
                <progress className={s.progress} value={timeData.currentTime} max={timeData.duration}></progress>
                <span>{videoFullTimer}</span>
                <div className={s.fullScreen}>
                    <BsArrowsFullscreen fontSize={16} />
                </div>
            </div>
            <div className={s.centerControl}>
                {
                    isPlaying
                        ? <FaRegPauseCircle onClick={handleStopPlaying} fontSize={50} />
                        : <FaRegCirclePlay onClick={handleStartPlaying} fontSize={50} />
                }
            </div>
        </div>
    )
}