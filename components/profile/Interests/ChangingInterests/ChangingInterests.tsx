import { useState, useEffect } from "react";
import { $currentInterestsList, getInterests } from "../../../../global/store/store";
import s from "./ChangingInterests.module.scss";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { IInterest } from "../../../../entities/interest";

type ISelectedInterests = IInterest & {
    selected: boolean
}

export default function ChangingInterests(props: {
    currentInterests: string[],
    handleSaveClick: (interestList: ISelectedInterests) => void
}) {

    const [interestsList, setInterestsList] = useState<ISelectedInterests[]>([]);
    const currentInterests = useUnit($currentInterestsList);
    const { t } = useTranslation();

    const selectNewInterest = (index: number) => {
        const updatedInterests = interestsList;
        updatedInterests[index].selected = !updatedInterests[index].selected;
        setInterestsList(() => [...updatedInterests]);
    };

    useEffect(() => {
        getInterests();
    }, []);

    useEffect(() => {
        setInterestsList(currentInterests.map(el => {
            if (props.currentInterests.includes(el.interestId)) {
                return { ...el, selected: true }
            }
            return { ...el, selected: false }
        }
        ));
    }, [currentInterests]);

    return (
        <div className={s.changingInterests}>
            <div className={s.changingInterestsList}>
                {
                    interestsList.map((el, index) => (
                        <button
                            key={el.title}
                            className={el.selected ? s.active : s.inactive}
                            onClick={() => selectNewInterest(index)}
                        >{el.title}</button>
                    ))
                }
            </div>
            <div className={s.changingInterestsActions}>
                <button className={s.save} onClick={() => props.handleSaveClick(interestsList)}>{t("Сохранить")}</button>
            </div>
        </div>
    )
}