import { FormControl, InputAdornment, InputLabel, OutlinedInput, Slider } from "@mui/material";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollInfo } from "../../../global/hooks/useScrollInfo";
import { IPeople } from "../../../global/interfaces";
import { 
    allPeoples, 
    filterParams, 
    fullUpdatePeoples, 
    getAllPeoples, 
    getAllPeoplesByPageNumber, 
    isPeoplesLoaded, 
    maxPageOfPeople, 
    setAllPeoples, 
    setFilterParams, 
    setMaxPageOfPeople
} from "../../../global/store/peoples_model";
import { instance } from "../../../global/store/store";
import UserList from "../UserList/UserList";
import s from "./SearchingPeople.module.scss";



export default function SearchingPeople(): JSX.Element {

    const [goals, setGoals] = useState<string[]>(['Новые отношения','Друзей','Новые Интересы','Встречи','События','Общение в сети']);
    const [events, setEvents] = useState<string[]>(['По Москве на автобусе','История любви','"Энканто"','Green DAY']);
    const [popularInterests, setPopularInterests] = useState<string[]>(['Программирование', 'Бизнес', 'Кухня', 'Природа']);
    
    const maxPage$ = useStore(maxPageOfPeople);
    const peoplesList$: IPeople[] = useStore(allPeoples);
    const isPeoplesLoaded$: boolean = useStore(isPeoplesLoaded);

    const { t } = useTranslation();
    const [clearScrollData, setClearScrollData] = useState<boolean>(false);

    const isUpdatedScroll = () => {
        setClearScrollData(false);
    }
    const scrollData = useScrollInfo(maxPage$, clearScrollData, isUpdatedScroll);

    const showAllPeoples = () => {
        setClearScrollData(true);
        let defaultAge: any = 0;
        let defaultGender: any = 'all';
        setFilterParams(filterParams.defaultState.age = defaultAge);
        setFilterParams(filterParams.defaultState.gender = defaultGender);
    }
    const getData = async (param: string, data: any) => {
          switch (param){
            case 'age': 
                setFilterParams(filterParams.defaultState.age = data);
                break;
            case 'gender':
                setFilterParams(filterParams.defaultState.gender = data);
                break;
            default: return;
          }
          fullUpdatePeoples([]);
          setMaxPageOfPeople(0);
          setClearScrollData(true);
    }
    useEffect(() => {
        if (scrollData > 0) {
            getAllPeoplesByPageNumber({
                pageNumber: scrollData,
                pageSize: 10, 
                filters: { age: filterParams.defaultState.age, gender: filterParams.defaultState.gender }
            });
        }
    }, [scrollData])

    useEffect(() => {
        fullUpdatePeoples([]);
    }, [])
    return(
    
        <div className={s.searching}>
            <div className={s.params}>
                <div className={s.gender}>
                    <div className={s.part}>
                        <h4>Пол</h4>
                        <button onClick={() => getData("gender", "male")}>М</button>
                        <button onClick={() => getData("gender", "female")}>Ж</button>
                    </div>
                    <div className={s.part}>
                        <h4>Возвраст</h4>
                        <Slider onChangeCommitted={(event, newValue) => getData("age", newValue)} defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                    </div>
                    <div className={s.part}>
                        <h4>Расстояние</h4>
                        <Slider defaultValue={10} max={150} aria-label="Default" valueLabelDisplay="auto" />
                    </div>
                </div>
                <div className={s.goal}>
                    <h4>Цель</h4>
                    { goals.map((goal) => <div onClick={() => getData("goal", goal)} className={s.eachGoal} key={goal}>{goal}</div>)}
                </div>
                <div className={s.events}>
                    <h4>В событиях</h4>
                    <h6>Предстоящие</h6>
                    { events.map((event) => <div onClick={() => getData("event", event)} className={s.eachEvent} key={event}>{event}</div>)}
                </div>
                <div className={s.interests}>
                    <h4>По интересам</h4>
                    <FormControl>
                    <InputLabel htmlFor="outlined-adornment-amount">Найдите</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">&#128270;</InputAdornment>}
                        label="Amount"
                    />
                    </FormControl>
                    {popularInterests.map((popular) => <div onClick={() => getData("interests", popular)} className={s.eachPopular} key={popular}>{popular}</div>)}
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
                    { peoplesList$.length === 0 ? 
                    <div>
                        <h4>По Вашему запросу никого не найдено.</h4>
                        <button onClick={() => showAllPeoples()} className={s.showAllBtn}>{t('Показать всех')}</button>
                    </div>
                     : null 
                    }
                </div>
            </div>
        </div> 
    )
}