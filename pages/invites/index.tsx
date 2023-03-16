import { useStore } from "effector-react";
import PageContainer from "../../components/pageContainer/pageContainer";
import { $user } from "../../global/store/store";
import InvitesPageView from "./components/InvitesPageView/InvitesPageView";

export default function Invites() {

    const authedUser = useStore($user);

    return (
        <PageContainer>
            <InvitesPageView 
                authedUser={authedUser}
            />
        </PageContainer>
    )
}