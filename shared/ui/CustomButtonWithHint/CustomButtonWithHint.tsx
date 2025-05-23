"use client";
import { useEffect, useState } from "react";
import { isMobile, setIsScrollPageBlocked } from "../../../global/store/store";
import { useTranslation } from "react-i18next";
import { useUnit } from "effector-react";
import s from "./CustomButtonWithHint.module.scss";

interface IHintProps {
    title: string | React.ReactElement,
    hintTitle: string,
    fontSize: number,
    bordered?: boolean
}

export default function CustomButtonWithHint({ title, hintTitle, fontSize, bordered }: IHintProps) {

    const [isHint, setIsHint] = useState<boolean>(false);
    const isMobile$ = useUnit(isMobile);

    const { t } = useTranslation();
    
    useEffect(() => {
        if (isHint) {
            setIsScrollPageBlocked(true);
        } else {
            setIsScrollPageBlocked(false);
        }
    }, [isHint]);

    return (
        <div className={s.hintWrapper} style={{ fontSize: fontSize }}>
            <button 
                onClick={() => setIsHint(prev => !prev)} 
                style={bordered === false ? { border: "none" } : { border: "1px solid var(--border-color)" }}
            >
                {typeof title === "string" ? t(`${title}`) : title }
            </button>
            {
                isHint &&
                    <>
                        <div 
                            className={s.bluredBlock}
                            onClick={() => setIsHint(prev => !prev)}
                        ></div>
                        <div className={s.hint}>
                            {t(`${hintTitle}`)}
                        </div>
                    </>
                    
            }
        </div>
    )
}