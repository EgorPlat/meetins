import React, { ReactChild } from "react";
import LeftNavMenu from "../LeftNavMenu/LeftNavMenu";
import s from "./pageContainer.module.scss";
import { isMobile } from "../../global/store/store";
import { useUnit } from "effector-react";

export default function PageContainer(props: { children: ReactChild }): JSX.Element {

    const isMobile$ = useUnit(isMobile);

    if (isMobile$ === true) {
        return (
            <div className={s.mobilePage}>
                <div className={s.mobileContent}>
                    {props.children}
                </div>
            </div>
        )
    }
    else if (isMobile$ === false) {
        return (
            <div className={s.page}>
                <div className={s.menu}>
                    <LeftNavMenu />
                </div>
                <div className={s.content}>
                    {props.children}
                </div>
            </div>
        )
    }
}