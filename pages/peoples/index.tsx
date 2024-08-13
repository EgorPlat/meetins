import { useEffect } from "react";
import { currentWall$, getCurrentWall } from "../../global/store/wall_model";
import { useStore } from "effector-react";
import { getInterests, isMobile } from "../../global/store/store";
import { useRouter } from "next/router";
import React from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import LentaList from "./components/LentaList/LentaList";
import SearchingPeople from "./components/SearchingPeople/SearchingPeople";
import Head from "next/head";
import GroupsList from "./components/GroupsList/GroupsList";
import s from "./peoples.module.scss";
import CustomStepper from "../../components-ui/CustomStepper/CustomStepper";

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
                        { title: "Поиск людей", component: <SearchingPeople /> },
                        { title: "Сообщества", component: <GroupsList /> },
                        { title: "Новости", component: <LentaList wallPosts={currentWall} handleGoToLink={handleGoToLink} /> }
                    ]}
                />
            </div>
        </PageContainer>
    )
}