import React, { useEffect } from "react";
import { currentWall$, getCurrentWall } from "../../global/store/wall_model";
import { useStore } from "effector-react";
import { getInterests, isMobile } from "../../global/store/store";
import { useRouter } from "next/router";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import Head from "next/head";
import s from "./peoples.module.scss";
import CustomStepper from "../../global/components-ui/CustomStepper/CustomStepper";
import dynamic from "next/dynamic";
import CustomLoader from "../../global/components-ui/CustomLoader/CustomLoader";

const SearchingPeople = dynamic(() => import("./components/SearchingPeople/SearchingPeople"), {
    loading: () => <CustomLoader />
});
const GroupsList = dynamic(() => import("./components/GroupsList/GroupsList"), {
    loading: () => <CustomLoader />
});
const LentaList = dynamic(() => import("./components/LentaList/LentaList"), {
    loading: () => <CustomLoader />
});

export default function Peoples(): JSX.Element {

    const currentWall = useStore(currentWall$);
    const router = useRouter();
    const isMobile$ = useStore(isMobile);

    const handleGoToLink = (isGroup: boolean, linkId: number) => {
        if (isGroup) {
            router.push(`/groups/${linkId}`);
        } else {
            router.push(`/profile/${linkId}`);
        }
    };

    useEffect(() => {
        getCurrentWall();
        getInterests();
    }, []);

    return (
        <PageContainer>
            <div className={s.peoples}>
                <Head>
                    <title>Meetins - Люди</title>
                    <meta name="description" content="Ищите новые знакомства!" key="desc" />
                    <meta property="og:title" content="Только у нас Вы сможете найти себе хороших друзей и пообщаться!" />
                    <meta
                        name="keywords"
                        content="meetins, meetin-s, Meetins, Meetin-s, знакомства, meetings, meet, люди, peoples, meetins seven peoples" />
                    <meta
                        property="og:description"
                        content="Присоединяйтесь прямо сейчас, ищите людей."
                    />
                </Head>
                <CustomStepper
                    center={isMobile$}
                    steps={[
                        { title: "Поиск людей", component: SearchingPeople },
                        { title: "Сообщества", component: GroupsList },
                        { title: "Новости", component: LentaList, props: { wallPosts: currentWall, handleGoToLink: handleGoToLink } }
                    ]}
                />
            </div>
        </PageContainer>
    )
}