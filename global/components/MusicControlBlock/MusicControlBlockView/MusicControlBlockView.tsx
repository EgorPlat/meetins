import React, { useEffect, useRef } from 'react';
import { IActiveMusic } from '../../../interfaces/music';
import s from './MusicControlBlockView.module.scss';

export const MusicControlBlockView = (
    { 
        activeMusic 
    }: {
    activeMusic: IActiveMusic,
}) => {

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.currentTime = activeMusic.currentTime;
            audioRef.current.play();
        }
    }, [activeMusic]);
    
    return (
        <div className={s.wrapper}>
            <div className={s.content} style={{ backgroundImage: `url(${activeMusic.image})` }}>
                <span className={s.status}>
                    <div className={s.verticalBlock}></div>
                    <div className={s.verticalBlock}></div>
                    <div className={s.verticalBlock}></div>
                </span>
                <audio src={activeMusic.src} ref={audioRef} loop id="musicPageBlock" />
            </div>
        </div>
    )
}