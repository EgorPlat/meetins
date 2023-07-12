import InterestsPageView from "./components/InterestsPageView/InterestsPageView";
import PageContainer from "../../components/PageContainer/pageContainer";
import { addNewError } from "../../global/store/errors_model";

export default function Interests() {

    const handleSendForm = () => {
        addNewError({
            time: 3000,
            color: "green",
            textColor: "white",
            text: "Ваша заявка успешно отправлена!"
        })
    };

    return (
        <PageContainer>
            <InterestsPageView 
                handleSendForm={handleSendForm}
            />
        </PageContainer>
    )
}