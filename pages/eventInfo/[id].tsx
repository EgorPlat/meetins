import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import PageContainer from "../../components/pageContainer/pageContainer";
import { currentEventById, getEventById } from "../../global/store/events_model";
import EventBlock from "./EventBlock";
import s from "./eventInfo.module.scss";


export default function EventInfo(): JSX.Element {

    const currentEventById$ = useStore(currentEventById);
    const { query } = useRouter();

    useEffect(() => {
        if (query.id) {
            getEventById(String(query.id));
        }
    }, [query])
	return(
        <PageContainer>
            {currentEventById$ ? <EventBlock currentEventById={currentEventById$} /> : <Loader />}
        </PageContainer>
    )
};

