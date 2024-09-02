export interface MeetingComment { 
    userId: string, 
    text: string, 
    date: Date
}

export interface MeetingFile { 
    src: string, 
    type: string
}

export interface IMeeting {
    meetingId: string,
    participants: {
        login: number,
        name: string,
        avatar: string,
        userId: string
    }[],
    date: Date,
    description: string,
    goal: string,
    comments: MeetingComment[],
    title: string,
    address: string,
    preview: string,
    creatorId: string,
    files: MeetingFile[]
}

export interface ISplitedMeetings {
    previousMeetings: IMeeting[],
    furtherMeetings: IMeeting[],
}

export interface ICreateMeeting {
    title: string,
    date: string, 
    goal: string,
    description: string,
    address: string
}