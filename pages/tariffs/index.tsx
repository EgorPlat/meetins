import PageContainer from "../../global/components/PageContainer/pageContainer";
import TariffsPageView from "./components/TariffsPageView/TariffsPageView";
import { baseURL } from "../../global/store/store";

export default function Tariffs({ tarrifs }) {

    return (
        <PageContainer>
            <TariffsPageView
                tariffsData={tarrifs}
            />
        </PageContainer>
    )
}

export const getStaticProps = async () => {
    const response = await fetch(baseURL + "tariffs/getTariffsInfo");
    const tarrifs = await response.json();
    return {
        props: { tarrifs: tarrifs }
    }
}