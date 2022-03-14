import React from "react";
import s from "./interests.module.scss";
import Image from "next/image";
import like from "../../../public/images/interesting.svg";

export default function Interests(props: {interest: string[]}): JSX.Element {
    
    return(
        <div className={s.interests}>
            <div className={s.title}>
                <h3><Image src={like} width={30} height={30} alt="Сердечко" /><b>Интересы</b></h3>
            </div>
            {props.interest?.length > 0
            ? props.interest?.map((elem) => 
                <button type="button" className={`${s.interest}`} key={elem}>{elem}</button> 
            )
            : <p>Хобби пока-что нет.</p>}
        </div>
    )
}