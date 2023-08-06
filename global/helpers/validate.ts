import { addNewError } from "../store/errors_model"

export const validateEmailOrPhone = (value: string) =>
	/^(?:\d{11}|\w+@\w+\.\w{2,3})$/.test(value) === false
		? 'Пожалуйста следуйте формату: user_email@email.com или 79889998889'
		: true
export const isPhoneNumber = (value: string | null) => {
	return value && /\d{11}/.test(value) ? value : null
}
export const isEmail = (value: string | null) => {
	return value && /\w+@\w+\.\w{2,3}/.test(value) ? value : null
}
export const isTypeOfFileAreImage = (value: string) => {
	if (!value) return;
	const validTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/JPG', 'image/JPEG', 'image/PNG'];
	if (validTypes.includes(value)) {
		return true;
	}
	return false;
}
export const isTypeOfFileAreVideo = (value: string) => {
	if (!value) return;
	const validTypes = ['video/mp4', 'video/mp3'];
	if (validTypes.includes(value)) {
		return true;
	}
	return false;
}


export const validatePost = (post) => {
	if (post.title.length < 5) {
		addNewError({ text: 'Минимальное название темы - 5 символов', time: 3000, color: 'orange', textColor: "black" });
        return false;
	}
	if (post.description.length < 15) {
		addNewError({ text: 'Минимальная длина описания - 15 символов', time: 3000, color: 'orange', textColor: "black" });
        return false;
	}
    if (post.description.length > 100) {
        addNewError({ text: 'Максимальная длина описания - 100 символов', time: 3000, color: 'orange', textColor: "black" });
        return false;
    }
    if (post.title.length > 20) {
        addNewError({ text: 'Максимальное название темы - 20 символов', time: 3000, color: 'orange', textColor: "black" });
        return false;
    }
    return true;
}

export const isPassword = (password: string) => {
	if (password.length < 6) {
		return false;
	}
	if (password.length > 12) {
		return false;
	}
	return true;
}