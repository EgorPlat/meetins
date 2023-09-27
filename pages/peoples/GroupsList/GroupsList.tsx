import { useEffect } from 'react';
import GroupsListView from './GroupsListView/GroupsListView';
import { getGroupsList, groupsList } from '../../../global/store/groups_model';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { IGroup } from '../../../global/interfaces/groups';

export default function GroupsList () {

    const groupsList$ = useStore(groupsList);
    const router = useRouter();
    
    const handleGoToGroup = (group: IGroup) => {
        router.push(`/groups/${group.groupId}`);
    }
    useEffect(() => {
        getGroupsList();
    }, []);

    return (
        <GroupsListView
            groupsList={groupsList$}
            handleGoToGroup={handleGoToGroup}
        />
    )
}