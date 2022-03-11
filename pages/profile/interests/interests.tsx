import React from "react";
import s from "./interests.module.scss";
import Image from "next/image";
import like from "../../../public/images/interesting.svg";

export default function Interests(props: {interest: string[]}): JSX.Element {
    
    return(
        <div className="interests">
            <div className="title">
                <h3><Image src={like} width={30} height={30} alt="Сердечко" /><b>Интересы</b></h3>
            </div>
            {props.interest?.length > 0
            ? props.interest?.map((elem) => 
                elem === "Плавание" ? <button type="button" className={`${s.swim} ${s.interest}`}>{elem}</button> :
                elem === "Бокс" ? <button type="button" className={`${s.boks} ${s.interest}`}>{elem}</button> :
                elem === "Йога" ? <button type="button" className={`${s.yoga} ${s.interest}`}>{elem}</button> :
                elem === "Волейбол" ? <button type="button" className={`${s.voleyball} ${s.interest}`}>{elem}</button> : null
            )
            : <p>Хобби пока-что нет.</p>}
        </div>
    )
}