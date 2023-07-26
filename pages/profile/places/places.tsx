import React from "react";
import Image from "next/image";
import place from "../../../public/images/map.svg";
import s from "./places.module.scss";
import { useTranslation } from "react-i18next";
import { GiModernCity } from 'react-icons/gi';

export default function Places(props: {places: string[]}): JSX.Element {

    const { t } = useTranslation();
    return (
        <div className={s.places}>
            <div className={s.title}>
                <GiModernCity fontSize={32} />
                <b>{t("Места")}</b>
            </div>
            <div className={s.list}>
            { props.places !== undefined ? props.places.map((elem, index) => 
                <div className={s.item} key={elem}> {elem}{index !== props.places?.length-1 ? ", " : "."}</div>
            ) : <p><b>Мест пока нет.</b></p>}
            </div>
        </div>
    )
} 