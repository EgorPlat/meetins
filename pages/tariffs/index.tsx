import PageContainer from "../../widgets/PageContainer/pageContainer";
import TariffsPageView from "./components/TariffsPageView/TariffsPageView";
import { baseURL } from "../../global/store/store";
import React from "react";

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