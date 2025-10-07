import { RiErrorWarningLine } from "react-icons/ri";

export interface INotification {
    text: string,
    time: number,
    type: "success" | "warning" | "error" | "info",
    textColor: string
};

export const NOTIFICATION_COLOR_TYPES = {
    success: {
        icon: RiErrorWarningLine,
        color: "green"
    },
    warning: {
        icon: RiErrorWarningLine,
        color: "orange"
    },
    error: {
        icon: RiErrorWarningLine,
        color: "red"
    },
    info: {
        icon: RiErrorWarningLine,
        color: "blue"
    }
};

export interface ICreatedNotification {
    id: number,
    text: string,
    time: number,
    type: "success" | "warning" | "error" | "info",
    textColor: string
}