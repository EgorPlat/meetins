"use client";
import { useUnit } from "effector-react";
import Link from "next/link";
import React, { JSX } from "react";
import { useTranslation } from "react-i18next";
import { isUserUnReadMessagesExists } from "../../global/store/chat_model";
import { FaEnvelope, FaMeetup } from "react-icons/fa6";
import { BsCalendarEventFill, BsEnvelopeArrowUpFill } from "react-icons/bs";
import { IoMdBookmarks } from "react-icons/io";
import { SiApplemusic } from "react-icons/si";
import { IoPeopleCircleSharp } from "react-icons/io5";
import { TiPointOfInterestOutline } from "react-icons/ti";
import s from "./LeftNavMenu.module.scss";

export default function LeftNavMenu(): JSX.Element {

    const { t } = useTranslation();
    const isUserUnReadMessagesExists$ = useUnit(isUserUnReadMessagesExists);

    return(
        <div className={s.ul}>        
            <div className={s.messangerLink}>
                <FaEnvelope />
                <Link href="/messanger">{t("Мессенджер")}</Link>
                {isUserUnReadMessagesExists$ && <div className={s.count}></div>}
            </div>
            <div className={s.link}>
                <BsEnvelopeArrowUpFill />
                <Link href="/invites">{t("Приглашения")}</Link>
            </div>
            <div className={s.link}>
                <IoMdBookmarks />
                <Link href="/marks">{t("Закладки")}</Link>
                <div className={s.countMarks}></div>
            </div>
            <div className={s.link}>
                <SiApplemusic />
                <Link href="/music">{t("Музыка")}</Link>
            </div>
            <div className={s.link}>
                <IoPeopleCircleSharp />
                <Link href="/peoples">{t("Люди")}</Link>
            </div>
            <div className={s.link}>
                <BsCalendarEventFill />
                <Link href="/events">{t("События")}</Link>
            </div>
            <div className={s.link}>
                <TiPointOfInterestOutline />
                <Link href="/interests">{t("Интересы")}</Link>
            </div>
            <div className={s.link}>
                <FaMeetup />
                <Link href="/meetings">{t("Встречи")}</Link>
            </div>
        </div> 
    )
}