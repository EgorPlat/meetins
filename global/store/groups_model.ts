import { createEffect, createEvent, createStore, sample } from "effector";
import { ICreateGroup, IGroup, IGroupMembersInfo, IGroupTalkMessage, IManageGroup } from "../interfaces/groups";
import { instance } from "./store";

export const setGroupsList = createEvent<IGroup[]>();
export const addNewGroup = createEvent<IGroup>();
export const groupsList = createStore<IGroup[]>([] as IGroup[])
groupsList.on(setGroupsList, (_, newGroupsList) => {
    return newGroupsList;
})
groupsList.on(addNewGroup, (groupList, newGroup) => {
    return [...groupList, newGroup];
})

export const setActiveGroup = createEvent<IGroup>();
export const groupInfo = createStore<IGroup>({} as IGroup).on(setActiveGroup, (_, newGroup) => {
    return newGroup;
})
export const addActiveGroupTalkMessage = createEvent<IGroupTalkMessage>();
export const setActiveGroupTalkMessage = createEvent<IGroupTalkMessage[]>();
export const activeGroupTalksMessages = createStore<IGroupTalkMessage[]>([] as IGroupTalkMessage[])
.on(addActiveGroupTalkMessage, (prevMessages, newMessage) => {
    return [...prevMessages, newMessage];
})
.on(setActiveGroupTalkMessage, (_, messages) => {
    return messages;
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

export const joinToGroup = createEffect(async (groupId: number) => {
    const response = await instance.post(
        'groups/join-to-group', { groupId: groupId }
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

export const createNewGroup = createEffect(async (data: ICreateGroup) => {
    const response = await instance.post(
        'groups/create-new-group',
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

export const manageGroup = createEffect(async (formData: FormData) => {
    const response = await instance.post(
        'groups/manage-group-by-id', formData
    );
    return response;
});

export const addNewCommentIntoGroupPost = createEffect(async (params: {
    groupId: number,
    text: string,
    postId: number
}) => {
    const response = await instance.post(
        `groups/add-new-comment-into-post/${params.groupId}/${params.postId}`, params
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

export const likePostInGroup = createEffect(async (params: {
    groupId: number,
    postId: number
}) => {
    const response = await instance.put(
        `groups/like/${params.groupId}/${params.postId}`, params
    );
    return response;
});

export const unlikePostInGroup = createEffect(async (params: {
    groupId: number,
    postId: number
}) => {
    const response = await instance.put(
        `groups/unlike/${params.groupId}/${params.postId}`, params
    );
    return response;
});

sample({ 
    clock: [
        manageGroup.doneData, 
        createNewTalkInGroup.doneData, 
        createNewPostInGroup.doneData, 
        getGroupById.doneData,
        addNewCommentIntoGroupPost.doneData,
        likePostInGroup.doneData,
        unlikePostInGroup.doneData
    ], 
    filter: response => response.status <= 217,
    fn: response => response.data, 
    target: setActiveGroup
});


sample({ 
    clock: createNewGroup.doneData, 
    filter: response => response.status <= 217,
    fn: response => response.data, 
    target: addNewGroup
});

sample({ 
    clock: getGroupsList.doneData, 
    filter: response => response.status <= 217,
    fn: response => response.data, 
    target: setGroupsList
});

sample({ 
    clock: getGroupMembersInfo.doneData, 
    filter: response => response.status <= 217,
    fn: response => response.data, 
    target: setActiveGroupMembersInfo
});