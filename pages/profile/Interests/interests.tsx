import React, { useEffect, useState } from "react";
import s from "./interests.module.scss";
import Image from "next/image";
import like from "../../../public/images/interesting.svg";
import { getUserInterests, setCurrentProfileUser, updateInterests } from "../../../global/store/store";
import { User } from "../../../global/interfaces";
import ChangingInterests from "./ChangingInterests/ChangingInterests";
import { MdInterests } from 'react-icons/md';
import { useTranslation } from "react-i18next";

export default function Interests(props: {
    user: User,
    authedUser: User
}): JSX.Element {

    const { t } = useTranslation();
    const [currentUserInterests, setCurrentUserInterests] = useState([]);
    const [isChangeMode, setIsChangeMode] = useState(false);
    const isAuthedUserAreCurrentUser = props.authedUser?.userId === props.user?.userId;
    const isCurrentInterestsAvailable = currentUserInterests?.length > 0;

    const openChangeInterests = () => {
        setIsChangeMode(true);
    };

    const handleSaveClick = (updatedInterestList) => {
        const selectedInterests = updatedInterestList.reduce((prev, current) => {
            if (current.selected) {
                return [...prev, current.interestId];
            } else {
                return prev;
            }
        }, []);
        updateInterests(selectedInterests);
        setIsChangeMode(false);
    }

    useEffect(() => {
        if (props.user?.interests) {
            getUserInterests(props.user.interests).then(res => {
                setCurrentUserInterests(res);
            });
        }
    }, [props.user?.userId]);

    return (
        <>
            <div className={s.interests}>
                <div className={s.title}>
                    <MdInterests fontSize={34} />
                    <b>{t('Интересы')}</b>
                    {isAuthedUserAreCurrentUser &&
                        <span className={s.changeStatus} onClick={openChangeInterests}> (изм.)</span>
                    }
                </div>
                {
                    isChangeMode
                        ? <ChangingInterests currentInterests={props.authedUser.interests} handleSaveClick={handleSaveClick} />
                        : isCurrentInterestsAvailable
                            ? currentUserInterests.map((elem) =>
                                <button type="button" className={`${s.interest}`} key={elem.title}>{elem.title}</button>
                            )
                            : <p>{t('Хобби пока нет')}.</p>
                }
            </div>
        </>
    )
}