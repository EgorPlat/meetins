import { useRouter } from "next/router"
import Loader from "../../components/Loader/Loader";
import PageContainer from "../../components/pageContainer/pageContainer";
import EventsList from "./EventsList/EventsList";
import s from "./nameCategory.module.scss";

export default function CategoryEventInfo(): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;
    
    return(
        <PageContainer>
            <div className={s.content}>
                <div className={`${s.calendar} ${s.block}`}>
				    <span>Введите желаемую дату события: </span><input type = "date"/>
			    </div>
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