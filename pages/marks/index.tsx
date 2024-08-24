import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $user, getMarkedUsersInfo } from "../../global/store/store";
import { getUserEventsInfo } from "../../global/store/events_model";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MarkedPageView from "./components/MarkedPageView/MarkedPageView";

export default function Marks(): JSX.Element {

    const user$ = useStore($user);

    useEffect(() => {
        getMarkedUsersInfo();
        getUserEventsInfo();
    }, [user$]);

    return (
        <PageContainer>
            <MarkedPageView />
        </PageContainer>
    )
}