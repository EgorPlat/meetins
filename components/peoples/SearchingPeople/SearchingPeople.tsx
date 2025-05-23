"use client";
import { Slider } from "@mui/material";
import { useUnit } from "effector-react";
import React, { JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPeople, Params } from "@/entities";
import { userEvents, currentEventsInfoLoaded, getUserEventsInfo } from "@/global/store/events_model";
import { maxPageOfPeople, allPeoples, filterParams, isPagePending, setFilterParams, fullUpdatePeoples, setMaxPageOfPeople, getAllPeoplesByPageNumber } from "@/global/store/peoples_model";
import { $currentInterestsList } from "@/global/store/store";
import { GOALS } from "@/shared/helpers/constants";
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import InfinityScroll from "@/widgets/InfinityScroll/InfinityScroll";
import UserList from "../UserList/UserList";
import s from "./SearchingPeople.module.scss";

export default function SearchingPeople(): JSX.Element {

    const { t } = useTranslation();

    const maxPage$ = useUnit(maxPageOfPeople);
    const peoplesList$: IPeople[] = useUnit(allPeoples);
    const filterParams$: Params = useUnit(filterParams);
    const pending: boolean = useUnit(isPagePending);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

    const interests$ = useUnit($currentInterestsList);
    const events$ = useUnit(userEvents);
    const currentEventsInfoLoaded$ = useUnit(currentEventsInfoLoaded);

    const showAllPeoples = () => {
        setFilterParams({ ...filterParams$, gender: "all", age: 0, event: null });
    };

    const updateFilters = async (param: string, data: any) => {
        fullUpdatePeoples([]);
        setMaxPageOfPeople(0);
        setFilterParams({ ...filterParams$, [param]: data });
    };

    const handleIncreaseCurrentPage = () => {
        setCurrentPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    const handleUpdateCurrentPage = (newPage: number) => {
        setCurrentPageNumber(() => newPage);
    };

    useEffect(() => {
        getUserEventsInfo();
        return () => {
            setFilterParams({ ...filterParams$, gender: "all", age: 0, event: null });
            setMaxPageOfPeople(0);
            fullUpdatePeoples([]);
        }
    }, []);

    useEffect(() => {
        getAllPeoplesByPageNumber({
            pageNumber: 0,
            pageSize: 10,
            filters: filterParams$
        });
        setCurrentPageNumber(0);
    }, [filterParams$]);

    useEffect(() => {
        getAllPeoplesByPageNumber({
            pageNumber: currentPageNumber,
            pageSize: 10,
            filters: filterParams$
        });
    }, [currentPageNumber]);

    return (
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
                            style={{ color: "var(--default-color)" }}
                            onChangeCommitted={(event, newValue) => updateFilters("age", newValue)}
                            defaultValue={50}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <div className={s.part}>
                        <h3>Расстояние</h3>
                        <Slider 
                            defaultValue={10} 
                            max={150} 
                            aria-label="Default" 
                            valueLabelDisplay="auto" 
                            style={{ color: "var(--default-color)" }}
                        />
                    </div>
                </div>
                <div className={s.goal}>
                    <h3 className={s.title}>Цель</h3>
                    {GOALS
                        .map((goal) => 
                            <div onClick={() => updateFilters("goal", goal)} className={s.eachGoal} key={goal}>{goal}</div>
                        )}
                </div>
                <div className={s.events}>
                    <h3 className={s.title}>События</h3>
                    {
                        !currentEventsInfoLoaded$ && <CustomLoader />
                    }
                    {
                        currentEventsInfoLoaded$ &&
                        <div className={s.list}>
                            {events$.map((event) =>
                                <div
                                    onClick={() => updateFilters("event", event.id)}
                                    className={s.eachEvent}
                                    key={event.id}
                                >{event.title}</div>
                            )}
                        </div>
                    }
                    {
                        currentEventsInfoLoaded$ && 
                            events$.length === 0 && <span className={s.warning}>У вас нет событий в закладках.</span>
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
                        <InfinityScroll
                            maxPage={maxPage$}
                            handleIncreaseCurrentPage={handleIncreaseCurrentPage}
                            handleUpdateCurrentPage={handleUpdateCurrentPage}
                        >
                            <>
                                {peoplesList$.map(user => <UserList key={user.login} user={user} />)}
                            </>
                        </InfinityScroll>
                    </div>
                    {
                        maxPage$ === 0 && !pending ?
                            <div className={s.nothingFound}>
                                Никого не найдено.
                                <CustomButton onClick={() => showAllPeoples()} text={t("Показать всех")} />
                            </div>
                            : null
                    }
                    <div style={pending ? { opacity: 1 } : { opacity: 0 }}>Загрузка...</div>
                </div>
            </div>
        </div>
    )
}