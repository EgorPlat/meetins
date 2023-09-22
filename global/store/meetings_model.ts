import { createEffect, createEvent, createStore, sample } from "effector";
import { IMeeting, ISplitedMeetings } from "../interfaces/meetings";
import { instance } from "./store";

export const setCurrentMeetings = createEvent<ISplitedMeetings>();
export const currentMeetings = createStore<ISplitedMeetings>({
    previousMeetings: [],
    furtherMeetings: []
}).on(setCurrentMeetings, (_, meetings) => {
    return meetings;
});

export const getAllMeetings = createEffect(async () => {
	const meetings = await instance.get('meetings/get-all-meetings');
    return meetings;
})

sample({
    clock: getAllMeetings.doneData,
    filter: (res) => res.status === 200,
    fn: (res) => {
        let splitedMeetings = { previousMeetings: [], furtherMeetings: [] };
        res.data.map(el => {
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