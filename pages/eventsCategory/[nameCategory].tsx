import { useRouter } from "next/router"
import PageContainer from "../../global/components/PageContainer/pageContainer";
import EventsList from "./components/EventsList/EventsList";

export default function CategoryEventInfo(): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;
    return (
        <PageContainer>
            {
                nameCategory && typeof nameCategory === "string"
                    ? <EventsList category={nameCategory} /> : null
            }
        </PageContainer>
    )
}