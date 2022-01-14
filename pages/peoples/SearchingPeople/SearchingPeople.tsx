import { FormControl, InputAdornment, InputLabel, OutlinedInput, Slider } from "@mui/material";
import { useStore } from "effector-react";
import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../../../global/Loader/Loader";
import { isAsyncLoaded, setIsAsyncLoaded } from "../../../global/store/store";
import { $usersList, getAllRegisteredUsers, IShortUser, setUsersList } from "../../../global/store/users_model";
import UserList from "../UserList/UserList";
import s from "./SearchingPeople.module.scss";

export default function SearchingPeople(): JSX.Element {

    const [searchParams, setSearchParams] = useState<ISearchParams>();
    const [goals, setGoals] = useState<string[]>(['Новые отношения','Друзей','Новые Интересы','Встречи','События','Общение в сети']);
    const [events, setEvents] = useState<string[]>(['По Москве на автобусе','История любви','"Энканто"','Green DAY']);
    const [popularInterests, setPopularInterests] = useState<string[]>(['Программирование', 'Бизнес', 'Кухня', 'Природа']);

    const userList: IShortUser[] = useStore($usersList);
    const isListLoaded: boolean = useStore(isAsyncLoaded);

    useEffect(() => {
        getAllRegisteredUsers().then( (res) => {
            if(res.status === 200) {
                setUsersList(res.data);
                setIsAsyncLoaded(true);
            }
        }, (errors) => {
            console.log(errors);
        })
    }, [])
    return(
        <div className={s.searching}>
            <div className={s.params}>
                <div className={s.gender}>
                    <div className={s.part}>
                        <h4>Пол</h4>
                        <button>М</button>
                        <button>Ж</button>
                    </div>
                    <div className={s.part}>
                        <h4>Возвраст</h4>
                        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                    </div>
                    <div className={s.part}>
                        <h4>Расстояние</h4>
                        <Slider defaultValue={10} max={150} aria-label="Default" valueLabelDisplay="auto" />
                    </div>
                </div>
                <div className={s.goal}>
                    <h4>Цель</h4>
                    { goals.map((goal) => <div className={s.eachGoal} key={goal}>{goal}</div>)}
                </div>
                <div className={s.events}>
                    <h4>В событиях</h4>
                    <h6>Предстоящие</h6>
                    { events.map((event) => <div className={s.eachEvent} key={event}>{event}</div>)}
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
                    {popularInterests.map((popular) => <div className={s.eachPopular} key={popular}>{popular}</div>)}
                </div>
            </div>
            <div className={s.result}>
                {isListLoaded ? userList.map( user => <UserList key={user.loginUrl} user={user}/>) : <Loader/>}
            </div>
        </div>
    )
}

interface ISearchParams {
    gender: string,
    goal: string,
    events: string,
    interest: string
}