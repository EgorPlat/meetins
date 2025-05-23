"use client";
import { useState } from "react";
import s from "./CustomEditMenu.module.scss";

export default function CustomEditMenu(props: {
    data: {
        menuTitle: string,
        menuFunction: () => void
    }[]
}) {

    const [isContent, setIsContent] = useState<boolean>(false);

    return (
        <div className={s.customEditMenu} onClick={() => setIsContent(!isContent)}>
            <div className={s.round}></div>
            <div className={s.round}></div>
            <div className={s.round}></div>
            {
                isContent &&
                <>
                    <div className={s.content}>
                        {
                            props.data.map(el => (
                                <div
                                    key={el.menuTitle}
                                    onClick={el.menuFunction}
                                    className={s.menuElement}
                                >{el.menuTitle}</div>
                            ))
                        }
                        <div
                            onClick={() => setIsContent(false)}
                            className={s.menuElement}
                        >Закрыть</div>
                    </div>
                </>
            }
        </div>
    )
}