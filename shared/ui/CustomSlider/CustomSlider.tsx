import { useEffect, useState } from "react";
import s from "./CustomSlider.module.scss";
import { useUnit } from "effector-react";
import { isMobile } from "../../../global/store/store";
import CustomVideoPlayer from "../CustomVideoPlayer/CustomVideoPlayer";

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
    const isMobile$ = useUnit(isMobile);

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
        if (autoSwapTime) {
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
        }
    }, [activeImageId, autoSwapTime]);

    return (
        <div className={s.wrapper}>
            <div className={s.slider} style={isMobile$ ? { width: "100%" } : { width }}>
                <div className={s.slides}>
                    <>
                        {
                            files.map(file => {
                                const style = {
                                    transform: `translateX(-${activeImageId * 100}%)`,
                                    transition: "0.5s",
                                };
                                const key = file.src;

                                if (file.type.includes("image")) {
                                    return (
                                        <div className={s.slide} key={key} style={style}>
                                            <img
                                                src={file.src}
                                                alt={`Изображение ${file.src}`}
                                                onTouchStart={handleTouchStart}
                                                onTouchEnd={handleTouchEnd}
                                                onClick={(e) => e.preventDefault()}
                                            />
                                        </div>
                                    )
                                }
                                if (file.type.includes("video")) {
                                    return (
                                        <div className={s.slide} key={key} style={style}>
                                            <div
                                                className={s.videoWrapper}
                                                onTouchStart={handleTouchStart}
                                                onTouchEnd={handleTouchEnd}
                                            >
                                                <CustomVideoPlayer src={file.src} />
                                            </div>
                                        </div>
                                    )
                                }
                                if (file.type.includes("audio")) {
                                    return (
                                        <div className={s.slide} key={key} style={style}>
                                            <audio
                                                src={file.src}
                                                onTouchStart={handleTouchStart}
                                                onTouchEnd={handleTouchEnd}
                                                controls
                                            />
                                        </div>
                                    )
                                }
                                return (
                                    <div className={s.slide} key={key} style={style}>
                                        <div
                                            className={s.addition}
                                            onTouchStart={handleTouchStart}
                                            onTouchEnd={handleTouchEnd}
                                        >
                                            <div>Вложение (файл) - {file.type}</div>
                                            <a href={file.src} target='__blank'>Скачать</a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                </div>
                <div className={s.actions}>
                    {
                        files.map((el, index) => (
                            <div
                                className={
                                    index === activeImageId ? s.activeRound : s.inActiveRound
                                }
                                onClick={() => updateActiveImage(index)}
                                key={index}
                            ></div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}