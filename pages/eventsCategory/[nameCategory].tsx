import { useRouter } from "next/router"
import { useEffect } from "react";
import { currentEvents, getEvents, loadedStatus } from "../../global/store/events_model";
import { useStore } from "effector-react";
import { getCategoryName } from "../../shared/helpers/helper";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import EventsList from "./components/EventsList/EventsList";

export default function CategoryEventInfo(): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;
    
    const currentEvents$ = useStore(currentEvents);
    const loadedStatus$ = useStore(loadedStatus);
    const categoryName = getCategoryName(nameCategory?.toString());

    useEffect(() => {
        getEvents({categoryName: nameCategory?.toString(), page: 1});
    }, [nameCategory]);
    
    return (
        <PageContainer>
            {
                nameCategory && typeof nameCategory === "string"
                    ? 
                    <EventsList 
                        categoryName={categoryName}
                        currentEvents={currentEvents$}
                        loadedStatus={loadedStatus$}
                    /> : null
            }
        </PageContainer>
    )
}