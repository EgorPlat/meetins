import { useEffect, useState } from "react";
import GroupsListView from "./GroupsListView/GroupsListView";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { getGroupsList, groupsList, joinToGroup } from "../../../../global/store/groups_model";
import { $user, getInterests } from "../../../../global/store/store";
import { IGroup } from "../../../../global/interfaces/groups";
import CustomModal from "../../../../global/components-ui/CustomModal/CustomModal";
import CreateNewGroupForm from "../../../../global/forms/CreateNewGroup/Index";

export default function GroupsList () {

    const groupsList$ = useStore(groupsList);
    const router = useRouter();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const user$ = useStore($user);

    const handleJoinToGroup = (group: IGroup) => {
        if (!group.membersId.includes(user$.userId)) {
            joinToGroup(group.groupId);
        }
        router.push(`/groups/${group.groupId}`);
    };
    
    const handleGoToCheckGroup = (groupId: number) => {
        router.push(`/groups/${groupId}`);
    };

    const handleCrateNewGroup = () => {
        setIsCreateModalOpen(true);
    };

    useEffect(() => {
        getGroupsList();
        getInterests();
    }, []);

    return (
        <>
            <GroupsListView
                handleCrateNewGroup={handleCrateNewGroup}
                groupsList={groupsList$}
                handleJoinToGroup={handleJoinToGroup}
                handleGoToCheckGroup={handleGoToCheckGroup}
            />
            {
                isCreateModalOpen &&
                <CustomModal
                    isDisplay={isCreateModalOpen}
                    changeModal={setIsCreateModalOpen}
                    actionConfirmed={setIsCreateModalOpen}
                    title="Создать новую группу"
                    typeOfActions='none'
                >
                    <CreateNewGroupForm />
                </CustomModal>
            }
        </>
    )
}