import { useState, useEffect } from 'react';
import { $currentInterestsList, getInterests } from '../../../../global/store/store';
import s from './ChangingInterests.module.scss';
import { useStore } from 'effector-react';

export default function ChangingInterests(props: { 
    currentInterests: string[],
    handleSaveClick: (interestList) => void
}) {

    const [interestsList, setInterestsList] = useState([]);
    const currentInterests = useStore($currentInterestsList);

    const selectNewInterest = (index: number) => {
        let updatedInterests = interestsList;
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
    }, [currentInterests])

    return (
        <div className={s.changingInterests}>
            {
                interestsList.map((el, index) => (
                    <button
                        key={el.title}
                        className={ el.selected ? s.active : s.inactive } 
                        onClick={() => selectNewInterest(index)}
                    >{el.title}</button>
                ))
            }
            <div className={s.changingInterestsActions}>
                <button className={s.save} onClick={() => props.handleSaveClick(interestsList)}>Сохранить</button>
            </div>
        </div>
    )
}