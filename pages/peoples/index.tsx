import React from "react";
import { useState } from "react";
import PageContainer from "../../components/PageContainer/pageContainer";
import LentaList from "./LentaList/LentaList";
import s from "./peoples.module.scss";
import SearchingPeople from "./SearchingPeople/SearchingPeople";
import Head from "next/head";

export default function Peoples(): JSX.Element {

    const [currentChapter, setCurrentChapter] = useState<string>('searching');
    return(
        <PageContainer>
            <div className={s.peoples}>
                <Head>
                    <title>Mettins - Люди</title>
                    <meta name="description" content="Ищите новые знакомства!" key="desc" />
                    <meta property="og:title" content="Только у нас Вы сможете найти себе хороших друзей и пообщаться!" />
                    <meta
                    property="og:description"
                    content="Присоединяйтесь прямо сейчас, ищите людей."
                    />
                </Head>
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