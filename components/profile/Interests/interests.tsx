import React, { JSX, useEffect, useState } from "react";
import { getUserInterests, updateInterests } from "../../../global/store/store";
import { User } from "../../../entities";
import { MdInterests } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { IInterest } from "../../../entities/interest";
import ChangingInterests from "./ChangingInterests/ChangingInterests";
import CustomModal from "../../../shared/ui/CustomModal/CustomModal";
import s from "./interests.module.scss";

export default React.memo(function Interests(props: {
    user: User,
    authedUser: User
}): JSX.Element {

    const { t } = useTranslation();
    const [currentUserInterests, setCurrentUserInterests] = useState([]);
    const [isChangeMode, setIsChangeMode] = useState<boolean>(false);

    const isAuthedUserAreCurrentUser = props.authedUser?.userId === props.user?.userId;
    const isCurrentInterestsAvailable = currentUserInterests?.length > 0;

    const openChangeInterests = () => {
        setIsChangeMode(true);
    };

    const handleSaveClick = (updatedInterestList: any) => {
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
    }, [props.user?.interests]);

    return (
        <>
            <div className={s.interests}>
                <div className={s.title}>
                    <MdInterests fontSize={34} />
                    <b className={s.main}>{t("Интересы")}</b> 
                    {isAuthedUserAreCurrentUser &&
                        <span className={s.head} onClick={openChangeInterests}>
                            <span className={s.change}>{t("Изменить")}</span>
                        </span>
                    }
                </div>
                {
                    isChangeMode
                        ?
                        <CustomModal
                            title="Изменить интересы"
                            isDisplay={isChangeMode}
                            changeModal={setIsChangeMode}
                            actionConfirmed={setIsChangeMode}
                            typeOfActions="none"
                        >
                            <ChangingInterests currentInterests={props.authedUser.interests} handleSaveClick={handleSaveClick} />
                        </CustomModal>
                        : isCurrentInterestsAvailable
                            ? currentUserInterests.map((elem: IInterest) =>
                                <button type="button" className={`${s.interest}`} key={elem.title}>{elem.title}</button>
                            )
                            : <p>{t("Хобби пока нет")}.</p>
                }
            </div>
        </>
    )
})