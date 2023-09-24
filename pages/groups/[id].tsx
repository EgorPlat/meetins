import { useRouter } from "next/router"
import PageContainer from "../../global/components/PageContainer/pageContainer";

export default function Groups() {

    const router = useRouter();

    return (
        <PageContainer>
            <div>
                Group: {router.query.id}
            </div>
        </PageContainer>
    )
}