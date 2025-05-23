import { useState } from "react";
import { useTranslation } from "react-i18next";
import s from "./PostCommentForm.module.scss";
import { addNotification } from "../../../../global/store/notifications_model";

export default function PostCommentForm(props: {
    onSubmitComment: (commentText: string) => void
}) {

    const [commentText, setCommentText] = useState("");
    const { t } = useTranslation();

    const handleSubmit = () => {
        if (commentText?.length < 5) {
            addNotification({ text: "Длина комментария минимум 5 символов", type: "warning", time: 3000, textColor: "black" });
            return;
        }
        props.onSubmitComment(commentText);
    };
    
    return (
        <div className={s.postCommentForm}>
            <input
                type="text"
                placeholder={t("Введите текст комментария")}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleSubmit}>{">"}</button>
        </div>
    )
}