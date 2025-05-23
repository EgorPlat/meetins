import React, { JSX } from "react";
import s from "./MarkedPageView.module.scss";
import dynamic from "next/dynamic";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import CustomStepper from "@/shared/ui/CustomStepper/CustomStepper";

const MarkedUsers = dynamic(() => import("../MarkedUsers/markedUsers"), { loading: () => <CustomLoader />, ssr: false });
const MarkedEvents = dynamic(() => import("../MarkedEvents/markedEvents"), { loading: () => <CustomLoader />, ssr: false });

export default function MarkedPageView(): JSX.Element {

    return (
        <div className={s.content}>
            <CustomStepper
                steps={[
                    { title: "Люди", component: MarkedUsers },
                    { title: "События", component: MarkedEvents }
                ]}
            />
        </div>
    )
}