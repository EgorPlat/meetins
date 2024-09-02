import React from "react";
import s from "./MarkedPageView.module.scss";
import CustomStepper from "../../../../shared/ui/CustomStepper/CustomStepper";
import dynamic from "next/dynamic";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";

const MarkedUsers = dynamic(() => import("../MarkedUsers/markedUsers"), { loading: () => <CustomLoader /> });
const MarkedEvents = dynamic(() => import("../MarkedEvents/markedEvents"), { loading: () => <CustomLoader /> });

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