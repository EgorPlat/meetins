import { baseURL } from "@/global/store/store";
import { getCategoryName } from "@/shared/helpers/helper";
import EventsList from "@/components/eventsCategory/EventsList/EventsList";

async function fetchEventsByCategory(params) {
    const awaitedParams = await params;
    const response = await fetch(baseURL + "event/getEventsCategory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameCategory: awaitedParams.nameCategory, page: 1 })
    });
    const data = await response.json();
    return data;
};

export default async function CategoryEventInfo({ params }) {

    const awaitedParams = await params;
    const events = await fetchEventsByCategory(awaitedParams);
    const categoryName = getCategoryName(awaitedParams.nameCategory?.toString() || "");
    
    return (
        <EventsList 
            categoryName={categoryName}
            currentEvents={events}
            loadedStatus={true}
        />
    )
}