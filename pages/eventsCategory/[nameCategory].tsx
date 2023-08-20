import { useRouter } from "next/router"
import { useTranslation } from "react-i18next";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import EventsList from "./EventsList/EventsList";
import s from "./nameCategory.module.scss";

export default function CategoryEventInfo(): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;
    const { t } = useTranslation();

    return(
        <PageContainer>
            <div className={s.content}>
                <div className={`${s.list} ${s.block}`}>
                    {
                        nameCategory && typeof nameCategory === "string"
                        ? <EventsList category={nameCategory}/> : null
                    }
                </div>
            </div>
        </PageContainer>
    )
}