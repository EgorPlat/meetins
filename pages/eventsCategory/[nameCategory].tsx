import { useRouter } from "next/router"
import PageContainer from "../../components/pageContainer/pageContainer";

export default function CategoryEventInfo(): JSX.Element {

    const router = useRouter();
    const { nameCategory } = router.query;

    return(
        <PageContainer>
            <div>
                {nameCategory}
            </div>
        </PageContainer>
    )
}