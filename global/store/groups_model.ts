import { createEffect, createEvent, createStore, sample } from "effector";
import { IGroup, IGroupMembersInfo } from "../interfaces/groups";
import { instance } from "./store";

export const setGroupsList = createEvent<IGroup[]>();
export const groupsList = createStore<IGroup[]>([] as IGroup[]).on(setGroupsList, (_, newGroupsList) => {
    return newGroupsList;
})
export const setActiveGroup = createEvent<IGroup>();
export const groupInfo = createStore<IGroup>({} as IGroup).on(setActiveGroup, (_, newGroup) => {
    return newGroup;
})
export const setActiveGroupMembersInfo = createEvent<IGroupMembersInfo[]>();
export const groupMembersInfo = createStore<IGroupMembersInfo[]>([] as IGroupMembersInfo[])
.on(setActiveGroupMembersInfo, (_, newGroupMembersInfo) => {
    return newGroupMembersInfo;
})

export const getGroupsList = createEffect(async () => {
    const response = await instance.get(
        'groups/get-all-groups'
    );
    return response;
});

export const createNewPostInGroup = createEffect(async (data: FormData) => {
    const response = await instance.post(
        'groups/create-new-post-in-group',
        data
    );
    return response;
});

export const createNewTalkInGroup = createEffect(async (data: { title: string, groupId: string }) => {
    const response = await instance.post(
        'groups/create-new-talk-in-group',
        data
    );
    return response;
});

export const getGroupMembersInfo = createEffect(async (id: number) => {
    const response = await instance.post(
        'groups/get-group-members-info', { id: id }
    );
    return response;
});

export const getGroupById = createEffect(async (id: number) => {
    const response = await instance.post(
        'groups/get-group-by-id', { id: id }
    );
    return response;
});

export const getGroupTalkMessageByTalkId = createEffect(async (groupData: { 
    groupId: number, 
    talkId: number,
}) => {
    const response = await instance.post(
        'groups/get-group-talk-messages-by-id', { groupId: groupData.groupId, talkId: groupData.talkId }
    );
    return response;
});

export const getGroupTalksList = createEffect(async (groupId: number) => {
    const response = await instance.post(
        'groups/get-group-talks-by-id', { groupId }
    );
    return response;
});

export const createNewMessageInGroupTalk = createEffect(async (groupData: { 
    groupId: number, 
    talkId: number,
    text: string
}) => {
    const response = await instance.post(
        'groups/create-new-message-in-group-talk', { 
            groupId: groupData.groupId, 
            talkId: groupData.talkId,
            text: groupData.text
        }
    );
    return response;
});




sample({ 
    clock: getGroupsList.doneData, 
    filter: response => response.status <= 217,
    fn: response => response.data, 
    target: setGroupsList
});
sample({ 
    clock: getGroupById.doneData, 
    filter: response => response.status <= 217,
    fn: response => response.data, 
    target: setActiveGroup
});
sample({ 
    clock: getGroupMembersInfo.doneData, 
    filter: response => response.status <= 217,
    fn: response => response.data, 
    target: setActiveGroupMembersInfo
});