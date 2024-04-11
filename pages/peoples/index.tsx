import { useEffect, useState } from "react";
import React from "react";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import LentaList from "./components/LentaList/LentaList";
import s from "./peoples.module.scss";
import SearchingPeople from "./components/SearchingPeople/SearchingPeople";
import Head from "next/head";
import GroupsList from "./components/GroupsList/GroupsList";
import { currentWall$, getCurrentWall } from "../../global/store/wall_model";
import { useStore } from "effector-react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import CustomModal from "../../components-ui/CustomModal/CustomModal";
import { getInterests } from "../../global/store/store";
import { useRouter } from "next/router";

export default function Peoples(): JSX.Element {

    const [currentChapter, setCurrentChapter] = useState<string>('searching');
    const [isHintOpen, setIsHintOpen] = useState<boolean>(false);

    const currentWall = useStore(currentWall$);
    const router = useRouter();
    
    const handleGoToLink = (isGroup: boolean, linkId: number) => {
        if (isGroup) {
            router.push(`/groups/${linkId}`);
        } else {
            router.push(`/profile/${linkId}`);
        }
    };

    useEffect(() => {
        getCurrentWall();
        getInterests();
    }, []);
    
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
                    <FaRegCircleQuestion
                        className={s.hint}
                        onClick={() => setIsHintOpen(true)}
                    />
                    <button 
                        onClick={() => setCurrentChapter('groups')}
                        className={currentChapter === 'groups' ? s.selectedChapter : s.notSelectedChapter}
                    >Сообщества</button>
                    <button 
                        onClick={() => setCurrentChapter('list')}
                        className={currentChapter === 'list' ? s.selectedChapter : s.notSelectedChapter}
                    >Новости</button>
                </div>
                <div className={s.activeChapter}>
                    {
                        currentChapter === 'searching' ? <SearchingPeople /> :
                        currentChapter === 'list' ? 
                            <LentaList 
                                wallPosts={currentWall}
                                handleGoToLink={handleGoToLink}
                            /> : 
                        currentChapter === 'groups' && <GroupsList />
                    }
                </div>
                <CustomModal
                    isDisplay={isHintOpen}
                    title="Информация"
                    actionConfirmed={setIsHintOpen}
                    changeModal={setIsHintOpen}
                    typeOfActions="none"
                >
                    <div className={s.hintText}>
                        Внимание, данные фильтры лучше использовать при выключенной функции
                        <span style={{ color: "var(--default-color)"}}> "Фильтры контента"</span>.
                        <div>*</div>
                        <div className={s.block}>
                            Если данная функция включена, применение дополнительных фильтров может
                            не дать желаемого результата.
                        </div>
                    </div>
                </CustomModal>
            </div>
        </PageContainer> 
    )
}