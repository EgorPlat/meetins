import React, { useState } from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import MarkedEvents from "./MarkedEvents/markedEvents";
import s from "./marks.module.scss";

export default function Marks(): JSX.Element {

    const [currentMark, setCurrentMark] = useState<string>('events');

    return(
        <PageContainer>
            <div className={s.content}>
            <div className={s.types}>
                <button 
                    className={currentMark === 'all' ? s.active : s.inactive} 
                    onClick={() => setCurrentMark('all')}>Все
                </button>
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
                { currentMark === 'events' && <MarkedEvents /> }
            </div>
            </div>
        </PageContainer>
    )
}