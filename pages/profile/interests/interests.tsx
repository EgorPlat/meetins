import React from "react";
import s from "./interests.module.scss";
import Image from "next/image";
import like from "../../../public/images/interesting.svg";

export default function Interests(props: {interest: string[]}): JSX.Element {
    
    return(
        <div className={s.interests}>
            <div className={s.title}>
                <p><Image src={like} width={20} height={20} alt="Сердечко" /><b>Интересы</b></p>
            </div>
            {props.interest?.length > 0
            ? props.interest?.map((elem) => 
                <button type="button" className={`${s.interest}`} key={elem}>{elem}</button> 
            )
            : <p>Хобби пока-что нет.</p>}
        </div>
    )
}