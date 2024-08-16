import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { $user, getMarkedUsersInfo } from "../../global/store/store";
import { getUserEventsInfo } from "../../global/store/events_model";
import CustomStepper from "../../components-ui/CustomStepper/CustomStepper";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MarkedEvents from "./components/MarkedEvents/markedEvents";
import MarkedUsers from "./components/MarkedUsers/markedUsers";
import s from "./marks.module.scss";

export default function Marks(): JSX.Element {

    const user$ = useStore($user);

    useEffect(() => {
        getMarkedUsersInfo();
        getUserEventsInfo();
    }, [user$]);

    return (
        <PageContainer>
            <div className={s.content}>
                <CustomStepper
                    steps={[
                        { title: "Люди", component: MarkedUsers },
                        { title: "События", component: MarkedEvents }
                    ]}
                />
            </div>
        </PageContainer>
    )
}