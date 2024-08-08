import { createEffect, createEvent, createStore, sample } from "effector";
import { ICreateMeeting, IMeeting, ISplitedMeetings, MeetingComment } from "../interfaces/meetings";
import { instance } from "./store";
import { ChangeEvent } from "react";

export const setCurrentMeetings = createEvent<ISplitedMeetings>();
export const currentMeetings = createStore<ISplitedMeetings>({
    previousMeetings: [],
    furtherMeetings: []
}).on(setCurrentMeetings, (_, meetings) => {
    return meetings;
});

export const setUserPlaces = createEvent<string[]>();
export const currentUserPlaces$ = createStore<string[]>([]).on(setUserPlaces, (_, meetings) => {
    return meetings;
});

export const setSelectedMeeting = createEvent<IMeeting>();
export const addCommentToSelectedMeeting = createEvent<MeetingComment>();
export const selectedMeeting = createStore<IMeeting>(null)
.on(setSelectedMeeting, (_, meeting) => {
    return meeting;
})
selectedMeeting.on(addCommentToSelectedMeeting, (meeting, comment) => {
    return {
        ...meeting,
        comments: [...meeting.comments, comment]
    }
})

export const getAllMeetings = createEffect(async () => {
	const meetings = await instance.get('meetings/get-all-meetings');
    return meetings;
})

export const uploadFileToMediaMeeting = createEffect(async (params: {
    event: ChangeEvent<HTMLInputElement>, 
    meetingId: string
}
) => {
	const file = params.event.target.files[0];
	const formData = new FormData();
	formData.append('uploadedFile', file);
    formData.append('meetingId', params.meetingId)
    
	const response = await instance.post<IMeeting>('/meetings/upload-media', formData);
	return response;
});

export const handleCreateNewMeeting = createEffect(async (meeting: ICreateMeeting) => {
    const response = await instance.post<IMeeting>('/meetings/create-meeting', meeting);
    return response;
});

export const handleSendCommentIntoMeeting = createEffect(async (params: {
    meetingId: string, text: string
}) => {
    const response = await instance.post<IMeeting>('/meetings/send-comment', {
        meetingId: params.meetingId,
        text: params.text
    });
    return response;
});

export const handleRegInMeeting = createEffect(async (meetingId: string) => {
    const response = await instance.put<IMeeting>(`/meetings/reg-in-meeting/${meetingId}`);
    return response;
});

export const getUserPlaces = createEffect(async (data: { userId: string }) => {
	const response = await instance.get(`meetings/places/${data.userId}`);
	return response;
})

sample({
    clock: getUserPlaces.doneData,
    filter: (res) => res.status <= 217,
    fn: (res) => res.data,
    target: setUserPlaces
});

sample({
    clock: uploadFileToMediaMeeting.doneData,
    filter: (res) => res.status <= 217,
    fn: (res) => res.data,
    target: setSelectedMeeting
});

sample({
    clock: handleCreateNewMeeting.doneData,
    filter: (res) => res.status <= 217,
    fn: (res) => res,
    target: getAllMeetings
});

sample({
    clock: handleRegInMeeting.doneData,
    filter: (res) => res.status <= 217,
    fn: (res) => res.data,
    target: setSelectedMeeting
});

sample({
    clock: handleSendCommentIntoMeeting.doneData,
    filter: (res) => res.status <= 217,
    fn: (res) => res.data.comments[res.data.comments.length - 1],
    target: addCommentToSelectedMeeting
});

sample({
    clock: getAllMeetings.doneData,
    filter: (res) => res.status === 200,
    fn: (res) => {
        let splitedMeetings = { previousMeetings: [], furtherMeetings: [] };
        res.data.map((el: IMeeting) => {
            if (new Date(el.date).getTime() > new Date(Date.now()).getTime()) {
                splitedMeetings = {
                    ...splitedMeetings,
                    furtherMeetings: [...splitedMeetings.furtherMeetings, el]
                }
            } else {
                splitedMeetings = {
                    ...splitedMeetings,
                    previousMeetings: [...splitedMeetings.previousMeetings, el]
                }
            }
        });
        return splitedMeetings;
    },
    target: setCurrentMeetings
})