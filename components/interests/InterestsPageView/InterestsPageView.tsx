"use client";
import { IInterest } from "@/entities/interest";
import { useTranslation } from "react-i18next";
import CustomStepper from "@/shared/ui/CustomStepper/CustomStepper";
import s from "./InterestsPageView.module.scss";
import dynamic from "next/dynamic";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";

const InterestsList = dynamic(() => import("../InterestsList/InterestsList"), { loading: () => <CustomLoader />, ssr: false });
const InterestsAbout = dynamic(() => import("../InterestsAbout/InterestsAbout"), { loading: () => <CustomLoader />, ssr: false });

export default function InterestsPageView ({ currentInterests }: {
    currentInterests: IInterest[],
}) {

    const { t } = useTranslation();

    if (currentInterests) {
        return (
            <div className={s.interests}>
                <CustomStepper
                    steps={[
                        { title: t("Об интересах"), component: InterestsAbout },
                        { title: t("Список интересов"), component: InterestsList, props: {
                            list: currentInterests
                        } },
                    ]}
                />
            </div>
        )
    } else {
        return <div></div>
    }
}