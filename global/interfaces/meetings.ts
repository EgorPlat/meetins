export interface MeetingComment { 
    userId: string, 
    text: string, 
    date: Date
}

export interface IMeeting {
    meetingId: string,
    participants: string[],
    date: Date,
    description: string,
    goal: string,
    comments: MeetingComment[],
    title: string,
    address: string,
    preview: string
}

export interface ISplitedMeetings {
    previousMeetings: IMeeting[],
    furtherMeetings: IMeeting[],
}