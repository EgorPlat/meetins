import { Suspense, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { useRouter } from "next/router";
import { getGroupsList, groupsList, joinToGroup } from "../../../../global/store/groups_model";
import { $user, getInterests } from "../../../../global/store/store";
import { IGroup } from "../../../../entities/groups";
import GroupsListView from "./GroupsListView/GroupsListView";
import CustomModal from "../../../../shared/ui/CustomModal/CustomModal";
import dynamic from "next/dynamic";
import CustomLoader from "../../../../shared/ui/CustomLoader/CustomLoader";

const CreateNewGroupForm = dynamic(() => import("../../../../features/forms/CreateNewGroup/Index"));

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
                    <Suspense fallback={<CustomLoader />}>
                        <CreateNewGroupForm />
                    </Suspense>
                </CustomModal>
            }
        </>
    )
}