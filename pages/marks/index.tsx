import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $markedUsersInfo, $user, getMarkedUsersInfo } from "../../global/store/store";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MarkedEvents from "./components/MarkedEvents/markedEvents";
import MarkedUsers from "./components/MarkedUsers/markedUsers";
import s from "./marks.module.scss";
import { getUserEventsInfo, userEvents } from "../../global/store/events_model";
import CustomStepper from "../../components-ui/CustomStepper/CustomStepper";

export default function Marks(): JSX.Element {

    const user$ = useStore($user);
    const markedUsersInfo$ = useStore($markedUsersInfo);
    const markedEventsInfo$ = useStore(userEvents);

    useEffect(() => {
        getMarkedUsersInfo();
        getUserEventsInfo();
    }, [user$]);

    return (
        <PageContainer>
            <div className={s.content}>
                <CustomStepper
                    steps={[
                        { title: "Люди", component: <MarkedUsers markedUsers={markedUsersInfo$} /> },
                        { title: "События", component: <MarkedEvents markedEvents={markedEventsInfo$} /> }
                    ]}
                />
            </div>
        </PageContainer>
    )
}