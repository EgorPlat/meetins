import { useState } from 'react';
import Image from 'next/image';
import s from './CustomSlider.module.scss';

interface ICustomSliderProps {
    images: any[],
    width: string,
    height: string
}

export default function CustomSlider({ images, width, height }: ICustomSliderProps) {

    const [activeImageId, setActiveImageId] = useState<number>(0);
    const [touchXData, setTouchXData] = useState<number>(0);

    const updateActiveImage = (newActiveImageId: number) => {
        setActiveImageId(() => newActiveImageId);
    };

    const handleTouchStart = (e) => {
        setTouchXData(e.changedTouches[0].pageX);
    };

    const handleTouchEnd = (e) => {
        if (e.changedTouches[0].pageX < touchXData) {
            if (images.length - 1 === activeImageId){
                setActiveImageId(() => 0);
            } else {
                setActiveImageId((prev) => prev + 1);
            }
        } else {
            if (activeImageId === 0){
                setActiveImageId(() => images.length - 1);
            } else {
                setActiveImageId((prev) => prev - 1);
            }
        }
    };

    return (
        <div className={s.customSlider}>
            <div className={s.customSliderSlides}
                style={{ width, height }}
            >
                {
                    images.map(el => (
                        <div 
                            className={s.customSliderCurrentImage}
                            style={{ transform: `translateX(-${activeImageId * 100}%)` }}
                        >
                            <img 
                                src={el.image} 
                                width={300} 
                                height={300} 
                                alt="Главное изображение" 
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            />
                        </div>
                    ))
                }
            </div>
            <div className={s.customSliderState}>
                {
                    images.map((el, index) => (
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