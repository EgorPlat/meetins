import { addNotification } from "../../global/store/notifications_model";
import { useUnit } from "effector-react";
import { $currentInterestsList, addInterest, getInterests } from "../../global/store/store";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import InterestsPageView from "./components/InterestsPageView/InterestsPageView";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import Head from "next/head";

export default function Interests() {

    const currentInterests$ = useUnit($currentInterestsList);
    const titleRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const handleSendForm = () => {
        if (titleRef.current && titleRef.current.value.length >= 3) {
            addInterest(titleRef.current.value);
            addNotification({
                time: 3000,
                type: "success",
                textColor: "white",
                text: "Ваша заявка успешно отправлена!"
            })
        } else {
            addNotification({
                time: 3000,
                type: "warning",
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
            <>
                <Head>
                    <title>Meetins - {t("Интересы")}</title>
                    <link rel='icon' href='/images/logo.svg' />
                    <meta name="description" content="Meetings interests - this page is using to explore basic interests on the site." key="desc" />
                    <meta property="og:title" content="Social Media Interests" />
                    <meta
                        property="og:description"
                        content="Join us and get a lot of fun and new friends"
                    />
                </Head>
                <InterestsPageView
                    currentInterests={currentInterests$}
                    handleSendForm={handleSendForm}
                    titleRef={titleRef}
                />
            </>
        </PageContainer>
    )
}