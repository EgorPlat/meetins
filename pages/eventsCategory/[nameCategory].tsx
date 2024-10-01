import { useRouter } from "next/router"
import { useEffect } from "react";
import { setCurrentEvents } from "../../global/store/events_model";
import { getCategoryName } from "../../shared/helpers/helper";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import EventsList from "./components/EventsList/EventsList";
import { GetServerSideProps } from "next";
import { instance } from "../../global/store/store";

export default function CategoryEventInfo({ events }): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;
    const categoryName = getCategoryName(nameCategory?.toString());

    useEffect(() => {
        setCurrentEvents(events);
    }, [events]);
    
    return (
        <PageContainer>
            {
                <EventsList 
                    categoryName={categoryName}
                    currentEvents={events}
                    loadedStatus={true}
                />
            }
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
