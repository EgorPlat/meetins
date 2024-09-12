export interface INotification {
    text: string,
    time: number,
    type: "success" | "warning" | "error" | "info",
    textColor: string
};

export const NOTIFICATION_COLOR_TYPES = {
    success: "rgb(155, 255, 109)",
    warning: "rgb(245, 255, 109)",
    error: "rgb(255, 128, 109)",
    info: "rgb(109, 206, 255)"
};

export interface ICreatedNotification {
    id: number,
    text: string,
    time: number,
    type: "success" | "warning" | "error" | "info",
    textColor: string
}