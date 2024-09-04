import { useEffect, useState } from "react";
import s from "./CustomSplitedInput.module.scss";
import React from "react";
import { ALLOWED_SYMBOLS } from "../../helpers/constants";

interface ICustomSplitedInputProps {
    count: number,
    handleChangeValue: (value: string) => void
}

export default function CustomSplitedInput({ count, handleChangeValue }: ICustomSplitedInputProps) {

    const [currentSliceInput, setCurrentSliceInput] = useState<string>(`customSplitedItem${0}`);
    const [currentRefs, setCurrentRefs] = useState<React.RefObject<HTMLInputElement>[]>([]);

    const handleKeyDown = (e: any, index: number) => {        
        if (e.key === "Backspace" && e.target.value.length === 0 && index - 1 >= 0) {   
            setCurrentSliceInput(`customSplitedItem${index - 1}`);
            setTimeout(() => currentRefs[index - 1]?.current?.focus());
        }
        if (e.target.value.length !== 0) {
            if (index + 1 < count && ALLOWED_SYMBOLS.includes(e.key.toLowerCase())) {
                setCurrentSliceInput(`customSplitedItem${index + 1}`);
                if (currentRefs[index + 1]) {
                    currentRefs[index + 1].current.value = e.key;
                    setTimeout(() => currentRefs[index + 1].current.focus());
                }   
            }
        } else if(ALLOWED_SYMBOLS.includes(e.key.toLowerCase())) {
            e.target.value = e.key;
        }
        handleChangeValue(handleGetCurrentValueFromSlices());
    };

    const handleGetCurrentValueFromSlices = () => {
        const value = currentRefs.reduce((prev, elem) => {
            return prev += elem.current.value;
        }, "");
        return value;
    };

    useEffect(() => {
        setCurrentRefs((refs) => Array(count).fill(null).map((_, index) => refs[index] || React.createRef()));
    }, [count]);

    return (
        <div className={s.customSplitedInput}>
            {
                Array.from({ length: count }).map((_, index) => {
                    const currentId = `customSplitedItem${index}`;
                    const disabled = currentSliceInput !== currentId;
                    return (
                        <input
                            ref={currentRefs[index]}
                            id={`customSplitedItem${index}`}
                            maxLength={1}
                            className={s.eachItem}
                            placeholder=""
                            key={index}
                            disabled={disabled}
                            onKeyDown={e => handleKeyDown(e, index)}
                            style={disabled ? {border: "1px solid gray"} : {border: "2px solid var(--default-color)"}}
                        />
                    )
                })
            }
        </div>
    )
}