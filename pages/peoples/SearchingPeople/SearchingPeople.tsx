import { FormControl, InputAdornment, InputLabel, OutlinedInput, Slider } from "@mui/material";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollDownInfo } from "../../../global/hooks/useScrollInfo";
import { IPeople, Params } from "../../../global/interfaces";
import { 
    allPeoples, 
    filterParams,
    fullUpdatePeoples,
    getAllPeoplesByPageNumber, 
    isPagePending, 
    maxPageOfPeople, 
    setFilterParams, 
    setMaxPageOfPeople
} from "../../../global/store/peoples_model";
import UserList from "../UserList/UserList";
import s from "./SearchingPeople.module.scss";
import { events, goals, popularInterests } from "../../../global/constants";



export default function SearchingPeople(): JSX.Element {

    const { t } = useTranslation();

    const maxPage$ = useStore(maxPageOfPeople);
    const peoplesList$: IPeople[] = useStore(allPeoples);
    const filterParams$: Params = useStore(filterParams);
    const pending: boolean = useStore(isPagePending);

    const [clearScrollData, setClearScrollData] = useState<boolean>(false);
    const handleClearedScroll = () => {
        setClearScrollData(false);
    }
    const scrollData = useScrollDownInfo(maxPage$, clearScrollData, handleClearedScroll);

    const showAllPeoples = () => {
        setClearScrollData(true);
        setFilterParams({ gender: 'all', age: 0 });
    }
    const updateFilters = async (param: string, data: any) => {
        if (param === 'age') setFilterParams({ ...filterParams$, age: data });
        if (param === 'gender') setFilterParams({ ...filterParams$, gender: data });
        fullUpdatePeoples([]);
        setMaxPageOfPeople(0);
        setClearScrollData(true);
    }

    useEffect(() => {
        getAllPeoplesByPageNumber({
            pageNumber: scrollData,
            pageSize: 10, 
            filters: { age: filterParams$.age, gender: filterParams$.gender }
        });        
    }, [scrollData])

    useEffect(() => {
        fullUpdatePeoples([]);
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
                        <h3>Возраст</h3>
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
                    <h3>Цель</h3>
                    { goals.map((goal) => <div onClick={() => updateFilters("goal", goal)} className={s.eachGoal} key={goal}>{goal}</div>)}
                </div>
                <div className={s.events}>
                    <h3>События</h3>    
                    <h6>Предстоящие</h6>
                    { events.map((event) => <div onClick={() => updateFilters("event", event)} className={s.eachEvent} key={event}>{event}</div>)}
                </div>
                <div className={s.interests}>
                    <h3>Интересы</h3>
                    <FormControl>
                    <InputLabel htmlFor="outlined-adornment-amount">Найдите</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">&#128270;</InputAdornment>}
                        label="Amount"
                    />
                    </FormControl>
                    { 
                        popularInterests.map((popular) => (
                            <div onClick={() => updateFilters("interests", popular)} className={s.eachPopular} key={popular}>{popular}</div>
                        ))
                    }
                </div>
            </div>
            <div className={s.result}>
                <div className={s.filterSelect}>
                    <select>
                        <option value="All">Все</option>
                        <option value="Online">Онлайн</option>
                        <option value="Event">В событиях</option>
                    </select>
                </div>
                <div className={s.users}>
                    <div className={s.usersList}>
                        {peoplesList$.map( user => <UserList key={user.login} user={user}/>)}
                    </div>
                    { 
                        peoplesList$.length === 0 && !pending ? 
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