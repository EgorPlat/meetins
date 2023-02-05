import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addNewError } from '../../../../global/store/errors_model';
import s from './PostCommentForm.module.scss';

export default function PostCommentForm(props: {
    onSubmitComment: (commentText: string) => void
}) {

    const [commentText, setCommentText] = useState("");
    const { t } = useTranslation();
    
    const handleSubmit = () => {
        if (commentText?.length < 5) {
            addNewError({ text: "Длина комментария минимум 5 символов", color: "orange", time: 3000 });
            return;
        }
        props.onSubmitComment(commentText);
    }
    return (
        <div className={s.postCommentForm}>
            <input 
                type="text" 
                placeholder={t('Введите текст комментария')} 
                onChange={(e) => setCommentText(e.target.value)} 
            />
            <button onClick={handleSubmit}>{`>`}</button>
        </div>
    )
}