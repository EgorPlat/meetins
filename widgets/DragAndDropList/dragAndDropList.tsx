import React, { useState } from "react";
import s from "./dragAndDropList.module.scss";

interface IDndElement { id: string | number, component: React.ReactElement }
interface IDragAndDropProps {
    data: IDndElement[],
    handleGetSortedData: (sortedList: IDndElement[]) => void
}

export default function DragAndDropList (props: IDragAndDropProps) {

    const [sortedList, setSortedList] = useState<IDndElement[]>(props.data);
    const [activeElement, setActiveElement] = useState<IDndElement>(null);

    const handleSwapElements = (element1: IDndElement, element2: IDndElement) => {
        if (!element1 || !element2) {
            setActiveElement(null);
            return;
        };
        const updatedList = sortedList.map(el => {
            if (el.id === element1.id) return element2;
            if (el.id === element2.id) return element1;
            return el;
        });
        setSortedList(updatedList);
    };

    const handleDragStart = (el: IDndElement) => {
        setActiveElement(el);
    };

    const handleDragOver = (el: IDndElement) => {
        handleSwapElements(activeElement, el);
    };
    
    const handleDragEnd = () => {
        setActiveElement(null);
        props.handleGetSortedData(sortedList);
    };

    return (
        <div className={s.dragAndDropList}>
            {
                sortedList.map((el) => (
                    <div
                        className={s.dragAndDropListElement}
                        style={
                            activeElement?.id === el.id ? { 
                                opacity: .1,
                            } : { 
                                opacity: 1,
                            }
                        }
                        key={el.id} 
                        draggable
                        onDragStart={() => handleDragStart(el)}
                        onDragOver={() => handleDragOver(el)}
                        onDragEnd={() => handleDragEnd()}
                    >
                        {el.component}
                    </div>
                ))
            }
        </div>
    )
}