import React, { useEffect, useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MarkedEvents from "./components/MarkedEvents/markedEvents";
import s from "./marks.module.scss";
import MarkedUsers from "./components/MarkedUsers/markedUsers";
import { useStore } from "effector-react";
import { $markedUsersInfo, $user, getMarkedUsersInfo } from "../../global/store/store";

export default function Marks(): JSX.Element {

    const [currentMark, setCurrentMark] = useState<string>('events');
    const user$ = useStore($user);
    const markedUsersInfo$ = useStore($markedUsersInfo);

    useEffect(() => {
        getMarkedUsersInfo();
    }, []);

    return(
        <PageContainer>
            <div className={s.content}>
            <div className={s.types}>
                <button 
                    className={currentMark === 'peoples' ? s.active : s.inactive} 
                    onClick={() => setCurrentMark('peoples')}>Люди
                </button>
                <button
                    className={currentMark === 'events' ? s.active : s.inactive} 
                    onClick={() => setCurrentMark('events')}>События
                </button>
            </div>
            <div className={s.result}>
                { currentMark === 'events' && <MarkedEvents user={user$} /> }
                { currentMark === 'peoples' && <MarkedUsers markedUsers={markedUsersInfo$} /> }
            </div>
            </div>
        </PageContainer>
    )
}