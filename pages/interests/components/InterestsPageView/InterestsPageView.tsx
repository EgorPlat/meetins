import { IInterest } from "../../../../entities/interest";
import s from "./InterestsPageView.module.scss";
import { useTranslation } from "react-i18next";
import InterestsList from "../InterestsList/InterestsList";
import CustomStepper from "../../../../shared/ui/CustomStepper/CustomStepper";
import InterestsAbout from "../InterestsAbout/InterestsAbout";

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