import React from "react";
import s from "./MarkedPageView.module.scss";
import CustomStepper from "../../../../global/components-ui/CustomStepper/CustomStepper";
import MarkedUsers from "../MarkedUsers/markedUsers";
import MarkedEvents from "../MarkedEvents/markedEvents";

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