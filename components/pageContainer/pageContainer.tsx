import { useStore } from "effector-react";
import React, { ReactChild, ReactChildren } from "react";
import { isMobile } from "../../global/store/store";
import LeftNavMenu from "../LeftNavMenu/LeftNavMenu";
import s from "./pageContainer.module.scss";

export default function PageContainer(props: {children: ReactChild}): JSX.Element {

    const isMobile$ = useStore(isMobile);
    
    return (
        <div className={s.nav}>
            <div className={s.menu}>
                {/* isMobile$ ? <LeftNavMenu/> : <MobileLeftNavMenu /> */}
                <LeftNavMenu/>
            </div>
            <div className={s.content}>
                {props.children}
            </div>
        </div>
    )
}