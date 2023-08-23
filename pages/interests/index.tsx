import InterestsPageView from "./components/InterestsPageView/InterestsPageView";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import { addNotification } from "../../global/store/notifications_model";

export default function Interests() {

    const handleSendForm = () => {
        addNotification({
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