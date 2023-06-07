import { useEffect } from "react";
import { getTariffsData, tariffs } from "../../global/store/tariffs_model";
import { useStore } from "effector-react";
import PageContainer from "../../components/pageContainer/pageContainer";
import TariffsPageView from "./components/TariffsPageView/TariffsPageView";

export default function Tariffs() {

    const tariffsData$ = useStore(tariffs);

    useEffect(() => {
        getTariffsData();
    }, []);

    return (
        <PageContainer>
            <TariffsPageView
                tariffsData={tariffsData$}
            />
        </PageContainer>
    )
}