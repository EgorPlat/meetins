import { FormControl, InputAdornment, InputLabel, OutlinedInput, Slider } from "@mui/material";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { IPeople } from "../../../global/interfaces";
import { allPeoples, filterParams, getAllPeoples, isPeoplesLoaded, setAllPeoples, setFilterParams } from "../../../global/store/peoples_model";
import { instance } from "../../../global/store/store";
import UserList from "../UserList/UserList";
import s from "./SearchingPeople.module.scss";



export default function SearchingPeople(): JSX.Element {

    const [goals, setGoals] = useState<string[]>(['Новые отношения','Друзей','Новые Интересы','Встречи','События','Общение в сети']);
    const [events, setEvents] = useState<string[]>(['По Москве на автобусе','История любви','"Энканто"','Green DAY']);
    const [popularInterests, setPopularInterests] = useState<string[]>(['Программирование', 'Бизнес', 'Кухня', 'Природа']);
    
    const peoplesList$: IPeople[] = useStore(allPeoples);
    const isPeoplesLoaded$: boolean = useStore(isPeoplesLoaded);
    const [dinamicUsers, setDinamicUsers] = useState<IPeople[]>([]);
    

    const getData = async (param: string, data: any) => {
          switch (param){
            case 'age': 
                setFilterParams(filterParams.defaultState.age = data);
                break;
            case 'gender':
                setFilterParams(filterParams.defaultState.gender = data);
                break;
            case 'goal':
                setFilterParams(filterParams.defaultState.goal = data);
                break;
            case 'event':
                setFilterParams(filterParams.defaultState.events = data);
                break;
            case 'interests':
                setFilterParams(filterParams.defaultState.interests = data);
                break;
            default: return;
          }
          const response = await instance.post('users/getSortedUsers', filterParams.defaultState);
          setAllPeoples(response.data);
    }

    useEffect(() => {
        getAllPeoples();
        setDinamicUsers((dinamicUsers) =>  peoplesList$.slice(0, dinamicUsers.length+5)); 
    }, [])

    useEffect(() => {
        if(peoplesList$.length === 0) {
            setDinamicUsers(() => [])
        } else {
            setDinamicUsers((dinamicUsers) =>  peoplesList$.slice(0, dinamicUsers.length+5));
        }
        const scrollHandler = (event: any) => {
            if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight)<100) {
                setDinamicUsers((dinamicUsers) =>  peoplesList$.slice(0, dinamicUsers.length+5));          
            }
        }
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [peoplesList$])
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
                    { isPeoplesLoaded$ 
                    ?
                    <div className={s.usersList}>
                        {dinamicUsers.map( user => <UserList key={user.login} user={user}/>)}
                    </div> : <Loader/> 
                    }
                    { dinamicUsers.length === 0 ? 
                    <div>
                        <h4>По Вашему запросу никого не найдено.</h4>
                        <button onClick={() => getAllPeoples()} className={s.showAllBtn}>Показать всех</button>
                    </div>
                     : null 
                    }
                </div>
            </div>
        </div> 
    )
}