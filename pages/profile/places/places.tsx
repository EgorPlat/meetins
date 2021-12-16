import React from "react";
import Image from "next/image";
import place from "../../../public/images/map.svg";
import s from "./places.module.scss";

export default function Places(props: {places: string[]}): JSX.Element {
    return (
        <div className={s.places}>
            <div className={s.title}>
                <h3><Image src={place} width={30} height={30} alt="Метка" /><b>Места</b></h3>
            </div>
            <div className={s.list}>
            { props.places !== undefined ? props.places.map((elem, index) => 
                <div className={s.item} key={elem}> {elem}{index !== props.places.length-1 ? ", " : "."}</div>
            ) : <h3><b>Мест пока нет.</b></h3>}
            </div>
        </div>
    )
}