import React from 'react';
import { IActiveMusic } from '../../../interfaces/music';
import s from './MusicControlBlockView.module.scss';

export const MusicControlBlockView = (props: {
    activeMusic: IActiveMusic,
    audioRef: React.RefObject<HTMLAudioElement>
}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.content} style={{ backgroundImage: `url(${props.activeMusic.image})` }}>
                <span className={s.status}>Играет</span>
                <audio src={props.activeMusic.src} ref={props.audioRef} loop id="musicPageBlock" />
            </div>
        </div>
    )
}