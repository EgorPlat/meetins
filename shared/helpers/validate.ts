import { addNotification } from "../../global/store/notifications_model"

export const validateEmailOrPhone = (value: string) =>
    /^(?:\d{11}|\w+@\w+\.\w{2,3})$/.test(value) === false
        ? "Пожалуйста следуйте формату: user_email@email.com или 79889998889"
        : true

export const isPhoneNumber = (value: string | null) => {
    return value && /\d{11}/.test(value) ? value : null
};

export const isEmail = (value: string | null) => {
    return value && /\w+@\w+\.\w{2,3}/.test(value) ? value : null
};

export const isTypeOfFileAreImage = (value: string) => {
    if (!value) return;
    const validTypes = ["image/jpg", "image/jpeg", "image/png", "image/JPG", "image/JPEG", "image/PNG"];
    if (validTypes.includes(value)) {
        return true;
    }
    return false;
};

export const isTypeOfFileAreVideo = (value: string) => {
    if (!value) return;
    const validTypes = ["video/mp4", "video/mp3"];
    if (validTypes.includes(value)) {
        return true;
    }
    return false;
};

export const isTypeOfFileAreAudio = (value: string) => {
    if (!value) return;
    const validTypes = ["audio/mp3", "audio/mp3"];
    if (validTypes.includes(value)) {
        return true;
    }
    return false;
};

export const isTypeOfFileAreNotVideoOrImageOrAudio = (value: string) => {
    if (!value) return;
    if (
        !isTypeOfFileAreVideo(value) && 
        !isTypeOfFileAreImage(value) &&
        !isTypeOfFileAreAudio(value)
    ) {
        return true;
    } else {
        return false;
    }
};

export const validatePost = (post: { title: string, description: string, currentFiles: any }) => {
    if (post.currentFiles === null) {
        addNotification({ text: "Минимум 1 файл", time: 3000, type: "warning", textColor: "black" });
        return false;
    }
    if (post.title.length < 5) {
        addNotification({ text: "Минимальное название темы - 5 символов", time: 3000, type: "warning", textColor: "black" });
        return false;
    }
    if (post.description.length < 15) {
        addNotification({ text: "Минимальная длина описания - 15 символов", time: 3000, type: "warning", textColor: "black" });
        return false;
    }
    if (post.description.length > 900) {
        addNotification({ text: "Максимальная длина описания - 900 символов", time: 3000, type: "warning", textColor: "black" });
        return false;
    }
    if (post.title.length > 20) {
        addNotification({ text: "Максимальное название темы - 20 символов", time: 3000, type: "warning", textColor: "black" });
        return false;
    }
    return true;
};

export const isPassword = (password: string) => {
    if (password.length < 6) {
        return false;
    }
    if (password.length > 12) {
        return false;
    }
    return true;
};