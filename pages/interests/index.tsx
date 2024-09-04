import InterestsPageView from "./components/InterestsPageView/InterestsPageView";
import PageContainer from "../../widgets/PageContainer/pageContainer";
import Head from "next/head";
import { baseURL } from "../../global/store/store";
import { IInterest } from "../../entities/interest";

export default function Interests({ currentInterests }: { currentInterests: IInterest[] }) {

    return (
        <PageContainer>
            <>
                <Head>
                    <title>Meetins - Интересы</title>
                    <link rel='icon' href='/images/logo.svg' />
                    <meta 
                        name="description" 
                        content="Meetings interests - this page is using to explore basic interests on the site." 
                        key="desc" 
                    />
                    <meta property="og:title" content="Social Media Interests" />
                    <meta
                        property="og:description"
                        content="Join us and get a lot of fun and new friends"
                    />
                </Head>
                <InterestsPageView currentInterests={currentInterests} />
            </>
        </PageContainer>
    )
}

export async function getStaticProps(context) {
    const response = await fetch(baseURL + "interests/get-interests");
    const currentInterests = await response.json();

    return {
        props: {
            currentInterests,
        },
        revalidate: 60,
    };
}