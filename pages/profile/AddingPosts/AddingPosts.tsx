import React, { useRef, useState } from "react";
import s from "./AddingPosts.module.scss";
import { isMobile, sendNewUserPost } from "../../../global/store/store";
import { validatePost } from "../../../global/helpers/validate";
import { useStore } from "effector-react";
import { useTranslation } from "react-i18next";
import { validateFilesFromInputAndStructuring } from "../../../global/helpers/helper";

export default function AddingPosts(): JSX.Element {
    
    const ref = useRef(null);
    const { t } = useTranslation();
    const [addMode, setAddMode] = useState(true);
    const [postFormData, setPostFormData] = useState({ title: "", description: "", currentFiles: null });
    const isMobile$ = useStore(isMobile);

    const chooseFile = () => {
        ref.current.click();
    }
    const sendNewPost = () => {
        if (validatePost(postFormData)) {
            const formData = validateFilesFromInputAndStructuring(postFormData.currentFiles).dataForServer;
            formData.append('title', postFormData.title);
            formData.append('description', postFormData.description);
            sendNewUserPost(formData);
        }
    }
    return(
        <div className={s.addingPosts}>
            {
                addMode && 
                <div className={s.addingPostsForm}>
                    <div className={s.addingPostsFormMain}>
                        <input 
                            type="text" 
                            placeholder={t("Название поста")}
                            onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                        />
                    </div>
                    <div className={s.addingPostsUploadFiles}>
                        <a className={s.addingPostsFormMainFile} onClick={chooseFile}>
                            {!isMobile$ ? t('Добавить изображение к публикации') : t('Добавить изображение')}
                            ({postFormData.currentFiles?.length ? postFormData.currentFiles?.length : 0} / 5)
                            <input 
                                ref={ref} 
                                type="file"
                                accept=".png, .jpeg, .mp4, .mp3, .jpg"
                                multiple
                                onChange={(e) => setPostFormData({ ...postFormData, currentFiles: e.target.files })}
                            />
                        </a>
                    </div>
                    <div className={s.addingPostsFormDescription}>
                        <textarea 
                            placeholder={t('Введите описание к посту')}
                            onChange={(e) => setPostFormData({ ...postFormData, description: e.target.value })}
                        />
                        <button onClick={sendNewPost}>{t('Добавить')}</button>
                    </div>
                </div>
            } 
        </div>
    )
}