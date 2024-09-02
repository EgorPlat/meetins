export interface INotification {
    text: string,
    time: number,
    type: "success" | "warning" | "error" | "info",
    textColor: string
};

export const NOTIFICATION_COLOR_TYPES = {
    success: "rgb(59, 187, 72)",
    warning: "rgb(255, 200, 0)",
    error: "rgb(235, 53, 86)",
    info: "rgb(0, 174, 255)"
};

export interface ICreatedNotification {
    id: number,
    text: string,
    time: number,
    type: "success" | "warning" | "error" | "info",
    textColor: string
}