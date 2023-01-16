import { useState, useEffect } from 'react';
import { getInterests } from '../../../../global/store/store';
import s from './ChangingInterests.module.scss';

export default function ChangingInterests(props: { 
    currentInterests: string[],
    handleSaveClick: (interestList) => void
}) {

    const [interestsList, setInterestsList] = useState([]);

    const selectNewInterest = (index: number) => {
        let updatedInterests = interestsList;
        updatedInterests[index].selected = !updatedInterests[index].selected;
        setInterestsList(() => [...updatedInterests]);
    }
    useEffect(() => {
        getInterests().then(res => {
            setInterestsList(res.map(el => {
                if (props.currentInterests.includes(el.interestId)) {
                    return { ...el, selected: true }
                }
                return { ...el, selected: false }
            } 
            ));
        });
    }, [])
    return (
        <div className={s.changingInterests}>
            {
                interestsList.map((el, index) => (
                    <button 
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