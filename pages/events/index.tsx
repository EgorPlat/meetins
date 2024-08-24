import PageContainer from "../../global/components/PageContainer/pageContainer";
import React from "react";
import EventsPageView from "./components/EventsPageView/eventsPageView";

export default function Events(): JSX.Element {

    return (
        <PageContainer>
            <EventsPageView />
        </PageContainer>
    )
}
