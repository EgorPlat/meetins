"use client";
import React, { JSX, useEffect } from "react";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { addNotification } from "@/global/store/notifications_model";
import { isMobile, getInterests } from "@/global/store/store";
import { currentWall$, getCurrentWall } from "@/global/store/wall_model";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import CustomStepper from "@/shared/ui/CustomStepper/CustomStepper";
import Head from "next/head";
import dynamic from "next/dynamic";

const SearchingPeople = dynamic(() => import("../../../components/peoples/SearchingPeople/SearchingPeople"), {
    loading: () => <CustomLoader />
});
const GroupsList = dynamic(() => import("../../../components/peoples/GroupsList/GroupsList"), {
    loading: () => <CustomLoader />
});
const LentaList = dynamic(() => import("../../../components/peoples/LentaList/LentaList"), {
    loading: () => <CustomLoader />
});

export default function Peoples(): JSX.Element {

    const currentWall = useUnit(currentWall$);
    const router = useRouter();
    const isMobile$ = useUnit(isMobile);

    const handleGoToLink = (isGroup: boolean, linkId: number) => {
        if (isGroup) {
            router.push(`/groups/${linkId}`);
        } else {
            router.push(`/profile/${linkId}`);
        }
    };

    const handleDontGetNotification = () => {
        addNotification({ 
            time: 3000,
            type: "info",
            text: "В скором времени Вы перестанете получать уведомления из этого источника",
            textColor: "white"
        })
    };

    useEffect(() => {
        getCurrentWall();
        getInterests();
    }, []);

    return (
        <div style={{ fontSize: "18px" }}>
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
                    { 
                        title: "Новости",
                        component: LentaList,
                        props: { 
                            wallPosts: currentWall,
                            handleGoToLink: handleGoToLink,
                            handleDontGetNotification: handleDontGetNotification
                        }
                    }
                ]}
            />
        </div>
    )
}