import React, { ReactChild } from "react";
import LeftNavMenu from "../LeftNavMenu/LeftNavMenu";
import s from "./pageContainer.module.scss";

export default function PageContainer(props: {children: ReactChild}): JSX.Element {

    return (
        <div className={s.page}>
            <div className={s.menu}>
                <LeftNavMenu/>
            </div>
            <div className={s.content}>
                {props.children}
            </div>
        </div>
    )
}