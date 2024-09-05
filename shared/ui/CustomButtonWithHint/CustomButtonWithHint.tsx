import { useEffect, useState } from "react";
import s from "./CustomButtonWithHint.module.scss";
import { setIsScrollPageBlocked } from "../../../global/store/store";
import { useTranslation } from "react-i18next";

interface IHintProps {
    title: string,
    hintTitle: string,
    fontSize: number
}

export default function CustomButtonWithHint({ title, hintTitle, fontSize }: IHintProps) {

    const [isHint, setIsHint] = useState<boolean>(false);
    const { t } = useTranslation();
    
    useEffect(() => {
        if (isHint) {
            setIsScrollPageBlocked(true);
        } else {
            setIsScrollPageBlocked(false);
        }
    }, [isHint]);

    return (
        <div className={s.hintBackground}>
            <div className={s.hintWrapper} style={{ fontSize: fontSize }}>
                <button onClick={() => setIsHint(prev => !prev)}>
                    {t(`${title}`)}
                </button>
                {
                    isHint &&
                    <>
                        <div 
                            className={s.bluredBlock}
                            style={{ height: document.getElementsByTagName("body")[0].clientHeight }}
                            onClick={() => setIsHint(prev => !prev)}
                        ></div>
                        <div className={s.hint}>
                            {t(`${hintTitle}`)}
                        </div>
                    </>
                    
                }
            </div>
        </div>
    )
}