import axios from "axios";
import { useRouter } from "next/router"
import { useEffect } from "react";
import PageContainer from "../../components/pageContainer/pageContainer";
import Loader from "../../global/Loader/Loader";
import EventsList from "./EventsList/EventsList";
import s from "./nameCategory.module.scss";

export default function CategoryEventInfo(): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;
    
    return(
        <PageContainer>
            <div className={s.content}>
                <div className={`${s.calendar} ${s.block}`}>
				    <input type = "date"/>
			    </div>
                <div className={`${s.list} ${s.block}`}>
                    {
                        nameCategory && typeof nameCategory === "string"
                        ? <EventsList category={nameCategory}/>
                        : 'Сначала выбирите нужную категорию событий.'
                    }
                </div>
            </div>
        </PageContainer>
    )
}