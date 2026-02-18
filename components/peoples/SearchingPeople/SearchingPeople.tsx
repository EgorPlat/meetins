"use client";
import { useUnit } from "effector-react";
import React, { JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IPeople, Params } from "@/entities";
import { userEvents, currentEventsInfoLoaded, getUserEventsInfo } from "@/global/store/events_model";
import { maxPageOfPeople, allPeoples, filterParams, isPagePending, setFilterParams, fullUpdatePeoples, setMaxPageOfPeople, getAllPeoplesByPageNumber } from "@/global/store/peoples_model";
import { $currentInterestsList } from "@/global/store/store";
import { GOALS } from "@/shared/helpers/constants";
import { AutoComplete } from 'antd';
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
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
                    <h3 className={s.title}>Основное</h3>
                    <AutoComplete
                        className={s.filterSelect}
                        showSearch={{ onSearch: (value) => console.log(value) }}
                        placeholder="Выберите пол..."
                        allowClear
                        options={[
                            { label: "Мужской", value: "male" },
                            { label: "Женский", value: "female" }
                        ]}
                        onChange={(value) => updateFilters("gender", value)}
                        tagRender={(el) => <div>{el.label}</div>}
                    />
                </div>
                <div className={s.goal}>
                    <h3 className={s.title}>Цель</h3>
                    <AutoComplete
                        className={s.filterSelect}
                        showSearch={{ onSearch: (value) => console.log(value) }}
                        placeholder="Выберите цель..."
                        allowClear
                        options={GOALS.map(el => {
                            return { label: el, value: el }
                        })}
                    />
                </div>
                <div className={s.events}>
                    <h3 className={s.title}>События</h3>
                    <AutoComplete
                        className={s.filterSelect}
                        showSearch={{ onSearch: (value) => console.log(value) }}
                        placeholder="Выберите событие..."
                        allowClear
                        onChange={(value) => updateFilters("event", value)}
                        options={events$.map(el => {
                            return { label: el.title, value: el.title }
                        })}
                    />
                </div>
                <div className={s.interests}>
                    <h3 className={s.title}>Интересы</h3>
                    <AutoComplete
                        className={s.filterSelect}
                        showSearch={{ onSearch: (value) => console.log(value) }}
                        placeholder="Выберите интерес..."
                        allowClear
                        options={interests$.map(el => {
                            return { label: el.title, value: el.title }
                        })}
                    />
                </div>
            </div>
            <div className={s.result}>
                <div className={s.users}>
                    <div className={s.usersList}>
                        <InfinityScroll
                            maxHeight={700}
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