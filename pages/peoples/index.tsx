import { useState } from "react";
import React from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import LentaList from "./LentaList/LentaList";
import s from "./peoples.module.scss";
import SearchingPeople from "./SearchingPeople/SearchingPeople";
import Head from "next/head";
import GroupsList from "./GroupsList/GroupsList";

export default function Peoples(): JSX.Element {

    const [currentChapter, setCurrentChapter] = useState<string>('searching');
    return(
        <PageContainer>
            <div className={s.peoples}>
                <Head>
                    <title>Meetins - Люди</title>
                    <meta name="description" content="Ищите новые знакомства!" key="desc" />
                    <meta property="og:title" content="Только у нас Вы сможете найти себе хороших друзей и пообщаться!" />
                    <meta 
                        name="keywords" 
                        content="meetins, meetin-s, Meetins, Meetin-s, знакомства, meetings, meet, люди, peoples, meetins seven peoples" />
                    <meta
                        property="og:description"
                        content="Присоединяйтесь прямо сейчас, ищите людей."
                    />
                </Head>
                <div className={s.chapters}>
                    <button 
                        onClick={() => setCurrentChapter('searching')}
                        className={currentChapter === 'searching' ? s.selectedChapter : s.notSelectedChapter}
                    >Поиск людей</button>
                    <button 
                        onClick={() => setCurrentChapter('list')}
                        className={currentChapter === 'list' ? s.selectedChapter : s.notSelectedChapter}
                    >Лента</button>
                    <button 
                        onClick={() => setCurrentChapter('groups')}
                        className={currentChapter === 'groups' ? s.selectedChapter : s.notSelectedChapter}
                    >Сообщества</button>
                </div>
                <div className={s.activeChapter}>
                    {
                        currentChapter === 'searching' ? <SearchingPeople /> :
                        currentChapter === 'list' ? <LentaList /> : 
                        currentChapter === 'groups' && <GroupsList />
                    }
                </div>
            </div>
        </PageContainer> 
    )
}