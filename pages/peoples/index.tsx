import React from "react";
import { useState } from "react";
import PageContainer from "../../components/pageContainer/pageContainer";
import LentaList from "./LentaList/LentaList";
import s from "./peoples.module.scss";
import SearchingPeople from "./SearchingPeople/SearchingPeople";

export default function Peoples(): JSX.Element {

    const [currentChapter, setCurrentChapter] = useState<string>('searching');
    return(
        <PageContainer>
            <div className={s.peoples}>
            <div className={s.chapters}>
                    <button onClick={() => setCurrentChapter('searching')}>Поиск людей</button>
                    <button onClick={() => setCurrentChapter('list')}>Лента</button>
            </div>
            <div className={s.activeChapter}>
                {
                    currentChapter === 'searching' ? <SearchingPeople/> :
                    currentChapter === 'list' ? <LentaList/> : null
                }
            </div>
            </div>
        </PageContainer> 
    )
}