import React, { JSX, Suspense } from "react";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { userEvents } from "@/global/store/events_model";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import s from "./markedEvents.module.scss";

const MarkedEventInfo = React.lazy(() => import("./MarkedEventInfo/markedEventInfo"));

export default function MarkedEvents(): JSX.Element {

    const markedEventsInfo$ = useUnit(userEvents);
    const { t } = useTranslation();

    if (markedEventsInfo$?.length === 0) {
        return (
            <div className={s.notify}>
                <h5 className={s.title}>{t("У вас пока нет событий в закладках")}</h5>
                <div className={s.subTitle}>
                    {t("Если Вы хотите сохранить событие в закладках, перейдите на страницу 'События', выберите категорию мероприятия и само мероприятие из списка и нажмите на кнопку 'Я пойду'")}
                </div>
            </div>
        )
    }
    if (markedEventsInfo$) {
        return (
            <div className={s.markedEvents}>
                <Suspense fallback={<CustomLoader />}>
                    {markedEventsInfo$?.map(event => (
                        <MarkedEventInfo event={event} key={event.id} />
                    ))}      
                </Suspense>
                
            </div>
        )
    } else {
        return null;
    }
}