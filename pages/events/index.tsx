import PageContainer from "../../widgets/PageContainer/pageContainer";
import React from "react";
import EventsPageView from "./components/EventsPageView/EventsPageView";

export default function Events(): JSX.Element {

    return (
        <PageContainer>
            <EventsPageView />
        </PageContainer>
    )
}
