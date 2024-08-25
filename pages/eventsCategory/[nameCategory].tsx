import { useRouter } from "next/router"
import PageContainer from "../../global/components/PageContainer/pageContainer";
import EventsList from "./components/EventsList/EventsList";
import { useEffect } from "react";
import { currentEvents, getEvents, loadedStatus } from "../../global/store/events_model";
import { getCategoryName } from "../../global/helpers/utils/getCategoryName";
import { useStore } from "effector-react";

export default function CategoryEventInfo(): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;
    
    const currentEvents$ = useStore(currentEvents);
    const loadedStatus$ = useStore(loadedStatus);
    const categoryName = getCategoryName(nameCategory.toString());

    useEffect(() => {
        getEvents({categoryName: nameCategory.toString(), page: 1});
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