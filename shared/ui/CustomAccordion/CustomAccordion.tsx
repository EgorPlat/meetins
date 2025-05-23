"use client";
import { useState } from "react";
import s from "./CustomAccordion.module.scss";

interface ICustomAccordionProps {
    text: string,
    subText: string
};

export default function CustomAccordion({ text, subText }: ICustomAccordionProps) {

    const [isSubTextNeeded, setIsSubTextNeeded] = useState<boolean>(false);

    const styles = isSubTextNeeded ? { maxHeight: "300px" } : { maxHeight: "50px" }

    return (
        <div
            className={s.customAccordion}
            style={styles}
        >
            <div className={s.customAccordionText} onClick={() => setIsSubTextNeeded(!isSubTextNeeded)}>
                {text} {isSubTextNeeded ? "-" : "+"}
            </div>
            {
                isSubTextNeeded &&
                <div className={s.customAccordionSubText}>
                    {subText}
                </div>
            }
        </div>
    )
}