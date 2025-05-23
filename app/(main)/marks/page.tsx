"use client";
import React, { JSX, useEffect } from "react";
import { useUnit } from "effector-react";
import { $user, getMarkedUsersInfo } from "@/global/store/store";
import { getUserEventsInfo } from "@/global/store/events_model";
import MarkedPageView from "@/components/marks/MarkedPageView/MarkedPageView";

export default function Marks(): JSX.Element {

    const user$ = useUnit($user);

    useEffect(() => {
        getMarkedUsersInfo();
        getUserEventsInfo();
    }, [user$]);

    return (
        <MarkedPageView />
    )
}