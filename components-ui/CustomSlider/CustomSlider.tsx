import { TouchEventHandler, useEffect, useState } from 'react';
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
    autoSwapTime?: number
}

export default function CustomSlider({ files, width, height, autoSwapTime }: ICustomSliderProps) {

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
        const differense = e.changedTouches[0].pageX - touchXData;

        if (differense >= -15 && differense <= 0) return;
        if (differense <= 15 && differense >= 0) return;
        if (e.changedTouches[0].pageX < touchXData) {
            if (files.length - 1 === activeImageId) {
                setActiveImageId(() => 0);
            } else {
                setActiveImageId((prev) => prev + 1);
            }
        } else {
            if (activeImageId === 0) {
                setActiveImageId(() => files.length - 1);
            } else {
                setActiveImageId((prev) => prev - 1);
            }
        }
    };

    useEffect(() => {
        if (isMobile$) setParams({ ...params, width: "300px " });
    }, [isMobile$]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (activeImageId === files.length - 1) {
                setActiveImageId(0);
            }
            else if (activeImageId < files.length) {
                setActiveImageId(() => activeImageId + 1);
            }
        }, autoSwapTime);
        return () => {
            clearInterval(interval);
        }
    }, [activeImageId]);

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
                                transition: '0.5s'
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
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    : el.type.includes('video') ?
                                        <video
                                            src={el.src}
                                            width={params.width}
                                            height={height}
                                            onTouchStart={handleTouchStart}
                                            onTouchEnd={handleTouchEnd}
                                            controls={true}
                                            onClick={(e) => e.preventDefault()}
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
                                            <div
                                                style={{
                                                    width: params.width,
                                                    textAlign: "center",
                                                }}
                                                onTouchStart={handleTouchStart}
                                                onTouchEnd={handleTouchEnd}
                                            >
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