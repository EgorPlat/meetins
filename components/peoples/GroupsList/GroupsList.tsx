"use client";
import { Suspense, useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { IGroup } from "@/entities/groups";
import { groupsList, joinToGroup, getGroupsList } from "@/global/store/groups_model";
import { $user, getInterests } from "@/global/store/store";
import CustomLoader from "@/shared/ui/CustomLoader/CustomLoader";
import CustomModal from "@/shared/ui/CustomModal/CustomModal";
import dynamic from "next/dynamic";
import GroupsListView from "./GroupsListView/GroupsListView";

const CreateNewGroupForm = dynamic(() => import("../../../features/forms/CreateNewGroup/Index"));

export default function GroupsList () {

    const groupsList$ = useUnit(groupsList);
    const router = useRouter();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const user$ = useUnit($user);

    const handleJoinToGroup = (group: IGroup) => {
        if (user$ && !group.membersId.includes(user$.userId)) {
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
    
    const handleCloseCreatingGroupForm = () => {
        setIsCreateModalOpen(false);
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
                        <CreateNewGroupForm handleCloseForm={handleCloseCreatingGroupForm} />
                    </Suspense>
                </CustomModal>
            }
        </>
    )
}