import InterestsPageView from "./components/InterestsPageView/InterestsPageView";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import { addNotification } from "../../global/store/notifications_model";
import { useStore } from "effector-react";
import { $currentInterestsList, addInterest, getInterests } from "../../global/store/store";
import { useEffect, useRef } from "react";

export default function Interests() {

    const currentInterests$ = useStore($currentInterestsList);
    const titleRef = useRef<HTMLInputElement>(null);

    const handleSendForm = () => {
        if (titleRef.current && titleRef.current.value.length >= 3) {
            addInterest(titleRef.current.value);
            addNotification({
                time: 3000,
                color: "green",
                textColor: "white",
                text: "Ваша заявка успешно отправлена!"
            })
        } else {
            addNotification({
                time: 3000,
                color: "orange",
                textColor: "white",
                text: "Название интереса не менее 3 симв."
            })
        }
    };

    useEffect(() => {
        getInterests();
    }, []);

    return (
        <PageContainer>
            <InterestsPageView
                currentInterests={currentInterests$}
                handleSendForm={handleSendForm}
                titleRef={titleRef}
            />
        </PageContainer>
    )
}