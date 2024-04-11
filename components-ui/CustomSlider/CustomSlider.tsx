import { useEffect, useState } from 'react';
import Image from 'next/image';
import s from './CustomSlider.module.scss';
import { useStore } from 'effector-react';
import { isMobile } from '../../global/store/store';

interface ICustomSliderProps {
    files: {
        src: string,
        type: string
    }[],
    width: string,
    height: string
}

export default function CustomSlider({ files, width, height }: ICustomSliderProps) {

    const [activeImageId, setActiveImageId] = useState<number>(0);
    const [touchXData, setTouchXData] = useState<number>(0);
    const [params, setParams] = useState({ width, height });
    const isMobile$ = useStore(isMobile);

    const updateActiveImage = (newActiveImageId: number) => {
        setActiveImageId(() => newActiveImageId);
    };

    const handleTouchStart = (e) => {
        setTouchXData(e.changedTouches[0].pageX);
    };

    const handleTouchEnd = (e) => {
        if (e.changedTouches[0].pageX < touchXData) {
            if (files.length - 1 === activeImageId){
                setActiveImageId(() => 0);
            } else {
                setActiveImageId((prev) => prev + 1);
            }
        } else {
            if (activeImageId === 0){
                setActiveImageId(() => files.length - 1);
            } else {
                setActiveImageId((prev) => prev - 1);
            }
        }
    };

    useEffect(() => {
        if (isMobile$) setParams({ ...params, width: "300px "});
    }, [isMobile$])

    return (
        <div className={s.customSlider}>
            <div className={s.customSliderSlides}
                style={{ width: params.width }}
            >
                {
                    files.map(el => (
                        <div 
                            className={s.customSliderCurrentImage}
                            style={{
                                transform: `translateX(-${activeImageId * 100}%)`,
                                transition: '1s'
                            }}
                            key={el.src}
                        >
                            {
                                el.type.includes('image') ?
                                    <img
                                        src={el.src} 
                                        width={params.width} 
                                        height={height} 
                                        alt="Главное изображение" 
                                        onTouchStart={handleTouchStart}
                                        onTouchEnd={handleTouchEnd}
                                    />
                                : el.type.includes('video') ?
                                    <video
                                        src={el.src} 
                                        width={params.width}
                                        height={height}
                                        onTouchStart={handleTouchStart}
                                        onTouchEnd={handleTouchEnd}
                                        controls
                                    />
                                : el.type.includes('audio') ? 
                                    <audio
                                        style={{ width: params.width, height }}
                                        src={el.src} 
                                        onTouchStart={handleTouchStart}
                                        onTouchEnd={handleTouchEnd}
                                        controls
                                    />
                                : 
                                <div style={{ width: params.width, textAlign: "center" }}>
                                    <div>Вложение (файл) - {el.type}</div>
                                    <a href={el.src} target='__blank'>Скачать</a>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div className={s.customSliderState}>
                {
                    files.map((el, index) => (
                        <div 
                            className={
                                index === activeImageId ? s.customSliderRoundActive : s.customSliderRoundInactive
                            }
                            onClick={() => updateActiveImage(index)}
                            key={index}
                        ></div>
                    ))
                }
            </div>
        </div>
    )
}