import { Slider } from "@mui/material";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollDownInfo } from "../../../../global/hooks/useScrollInfo";
import { IPeople, Params } from "../../../../global/interfaces";
import { 
    allPeoples, 
    filterParams,
    fullUpdatePeoples,
    getAllPeoplesByPageNumber, 
    isPagePending, 
    maxPageOfPeople, 
    setFilterParams, 
    setMaxPageOfPeople
} from "../../../../global/store/peoples_model";
import UserList from "../UserList/UserList";
import s from "./SearchingPeople.module.scss";
import { goals } from "../../../../global/constants";
import { $currentInterestsList } from "../../../../global/store/store";
import { currentEventsInfoLoaded, getUserEventsInfo, setCurrentEventsInfoLoaded, userEvents } from "../../../../global/store/events_model";
import CustomLoader from "../../../../components-ui/CustomLoader/CustomLoader";

export default function SearchingPeople(): JSX.Element {

    const { t } = useTranslation();

    const maxPage$ = useStore(maxPageOfPeople);
    const peoplesList$: IPeople[] = useStore(allPeoples);
    const filterParams$: Params = useStore(filterParams);
    const pending: boolean = useStore(isPagePending);
    const interests$ = useStore($currentInterestsList);
    const events$ = useStore(userEvents);
    const currentEventsInfoLoaded$ = useStore(currentEventsInfoLoaded);

    const [clearScrollData, setClearScrollData] = useState<boolean>(false);
    const handleClearedScroll = () => {
        setClearScrollData(false);
    }
    const scrollData = useScrollDownInfo(maxPage$, clearScrollData, handleClearedScroll);

    const showAllPeoples = () => {
        setClearScrollData(true);
        setFilterParams({ gender: 'all', age: 0, event: null });
    };

    const updateFilters = async (param: string, data: any) => {
        setFilterParams({ ...filterParams$, [param]: data });
        fullUpdatePeoples([]);
        setClearScrollData(true);
    };

    useEffect(() => {
        getAllPeoplesByPageNumber({
            pageNumber: scrollData,
            pageSize: 10,
            filters: filterParams$
        });
    }, [scrollData]);

    useEffect(() => {
        fullUpdatePeoples([]);
        setFilterParams({ gender: 'all', age: 0, event: null });
        getUserEventsInfo();
        return () => {
            setCurrentEventsInfoLoaded(false);
        }
    }, []);

    return(
        <div className={s.searching}>
            <div className={s.params}>
                <div className={s.gender}>
                    <div className={s.part}>
                        <h3>Пол</h3>
                        <button onClick={() => updateFilters("gender", "male")}>М</button>
                        <button onClick={() => updateFilters("gender", "female")}>Ж</button>
                    </div>
                    <div className={s.part}>
                        <h3 className={s.title}>Возраст</h3>
                        <Slider 
                            onChangeCommitted={(event, newValue) => updateFilters("age", newValue)} 
                            defaultValue={50} 
                            aria-label="Default" 
                            valueLabelDisplay="auto" 
                        />
                    </div>
                    <div className={s.part}>
                        <h3>Расстояние</h3>
                        <Slider defaultValue={10} max={150} aria-label="Default" valueLabelDisplay="auto" />
                    </div>
                </div>
                <div className={s.goal}>
                    <h3 className={s.title}>Цель</h3>
                    { goals.map((goal) => <div onClick={() => updateFilters("goal", goal)} className={s.eachGoal} key={goal}>{goal}</div>)}
                </div>
                <div className={s.events}>
                    <h3 className={s.title}>События</h3>
                    {
                        !currentEventsInfoLoaded$ && <CustomLoader />
                    }
                    {
                        currentEventsInfoLoaded$ &&
                        <div className={s.list}>
                            { events$.map((event) => 
                                <div 
                                    onClick={() => updateFilters("event", event.id)} 
                                    className={s.eachEvent} 
                                    key={event.id}
                                >{event.title}</div>
                            )}
                        </div>
                    }
                    {
                        currentEventsInfoLoaded$ && events$.length === 0 && 
                        <span className={s.warning}>У Вас нет событий в закладках.</span>
                    }
                </div>
                <div className={s.interests}>
                    <h3 className={s.title}>Интересы</h3>
                    <div className={s.list}>
                        { 
                            interests$.map((interest) => (
                                <div 
                                    onClick={() => updateFilters("interests", interest.title)} 
                                    className={s.eachPopular} 
                                    key={interest.interestId}
                                >{interest.title}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={s.result}>
                <div className={s.users}>
                    <div className={s.usersList}>
                        {peoplesList$.map( user => <UserList key={user.login} user={user}/>)}
                    </div>
                    { 
                        maxPage$ === 0 && !pending ? 
                        <div>
                            <h3>Никого не найдено.</h3>
                            <button onClick={() => showAllPeoples()} className={s.showAllBtn}>{t('Показать всех')}</button>
                        </div>
                        : null 
                    }
                    {
                        pending && <div>Загрузка...</div>
                    }
                </div>
            </div>
        </div> 
    )
}