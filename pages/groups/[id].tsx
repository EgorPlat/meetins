import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { getGroupById, getGroupMembersInfo, groupInfo, groupMembersInfo } from "../../global/store/groups_model";
import { useStore } from "effector-react";
import GroupInfoPageView from "./GroupInfoPageView/GroupInfoPageView";
import PageContainer from "../../global/components/PageContainer/pageContainer";
import { $user } from "../../global/store/store";
import CustomModal from "../../components-ui/CustomModal/CustomModal";
import ManageGroup from "../../global/Forms/ManageGroup/Index";

export default function Groups() {

    const router = useRouter();
    const groupInfo$ = useStore(groupInfo);
    const groupMembersInfo$ = useStore(groupMembersInfo);
    const authedUser$ = useStore($user);
    const isAutherUserCreator = authedUser$?.userId === groupInfo$?.creatorId;
    const [isSettingsGroupOpen, setIsSettingsGroupOppen] = useState<boolean>(false);

    const handleOpenGroupSettings = () => {
        setIsSettingsGroupOppen(true);
    };

    useEffect(() => {
        getGroupById(+router.query.id);
        getGroupMembersInfo(+router.query.id);
    }, [router.query.id]);
    
    return (
        <PageContainer>
            <div>
                <GroupInfoPageView
                    groupInfo={groupInfo$}
                    isAutherUserCreator={isAutherUserCreator}
                    handleOpenGroupSettings={handleOpenGroupSettings}
                    isSettingsGroupOpen={isSettingsGroupOpen}
                    groupMembersInfo={groupMembersInfo$}
                />
                <CustomModal
                        isDisplay={isSettingsGroupOpen}
                        changeModal={setIsSettingsGroupOppen}
                        actionConfirmed={setIsSettingsGroupOppen}
                        typeOfActions="none"
                        title="Управление сообществом"
                >
                    <ManageGroup />
                </CustomModal>
            </div>
        </PageContainer>
    )
}