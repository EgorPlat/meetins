import { useRouter } from "next/router"
import { useEffect } from "react";
import { setCurrentEvents } from "../../global/store/events_model";
import { getCategoryName } from "../../shared/helpers/helper";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import EventsList from "./components/EventsList/EventsList";
import { GetServerSideProps } from "next";
import { instance } from "../../global/store/store";
import Head from "next/head";

export default function CategoryEventInfo({ events }): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;
    const categoryName = getCategoryName(nameCategory?.toString() || "");
    
    useEffect(() => {
        setCurrentEvents(events);
    }, [events]);
    
    return (
        <PageContainer>
            <>
                <Head>
                    <title>Meetins - События</title>
                    <meta name="description" content="Ищите новые события!" key="desc" />
                    <meta property="og:title" content="Только у нас Вы сможете найти себе интересные события и мероприятия!" />
                    <meta
                        name="keywords"
                        content="meetins, meetin-s, Meetins, Meetin-s, знакомства, meetings, meet, meetins seven events category, meetins seven event category theather" />
                    <meta
                        property="og:description"
                        content="Присоединяйтесь прямо сейчас, ищите людей."
                    />
                </Head>
                <EventsList 
                    categoryName={categoryName}
                    currentEvents={events}
                    loadedStatus={true}
                />
            </>
        </PageContainer>
    )
}

export const getServerSideProps = (async (context) => {

    const categoryName = context.query.nameCategory;
    const response = await instance.post(
        "event/getEventsCategory", { nameCategory: categoryName, page: 1 }
    );
    
    return { 
        props: { events: response.data } 
    }
}) satisfies GetServerSideProps<{ events }>
