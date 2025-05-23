"use client";
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
    const [currentFoucIndex, setCurrentFocusIndex] = useState<number>(0);

    const handleKeyDown = (e: any, index: number) => {
        if (e.key === "Backspace") {
            e.target.value = "";
            if (index - 1 >= 0) {
                setCurrentSliceInput(`customSplitedItem${index - 1}`);
                setCurrentFocusIndex(index - 1);
            }
        }
        if (e.target.value.length !== 0) {
            if (index + 1 < count && ALLOWED_SYMBOLS.includes(e.key.toLowerCase()) && currentRefs[index + 1]) {
                currentRefs[index + 1].current.value = e.key;
                setCurrentSliceInput(`customSplitedItem${index + 1}`);
                setCurrentFocusIndex(index + 1);
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
        if (currentRefs[currentFoucIndex]) {
            currentRefs[currentFoucIndex].current.focus();
        }
    }, [currentFoucIndex, currentRefs]);

    useEffect(() => {
        setCurrentRefs(() => {
            return Array(count)
                .fill(null)
                .map(() => React.createRef())
        });
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