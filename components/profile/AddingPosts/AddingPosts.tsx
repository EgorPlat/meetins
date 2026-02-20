import React, { JSX, useRef, useState } from "react";
import s from "./AddingPosts.module.scss";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { isMobile, sendNewUserPost } from "@/global/store/store";
import { validatePost } from "@/shared/helpers/validate";
import { validateFilesFromInputAndStructuring } from "@/shared/helpers/helper";
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
import FormContainer from "@/widgets/FormContainer/FormContainer";

export default React.memo(function AddingPosts(): JSX.Element {

    const ref = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();
    const [postFormData, setPostFormData] = useState({ title: "", description: "", currentFiles: null });
    const isMobile$ = useUnit(isMobile);

    const chooseFile = () => {
        if (ref.current) {
            ref.current.click();
        } 
    };

    const sendNewPost = () => {
        if (validatePost(postFormData)) {
            const formData = validateFilesFromInputAndStructuring(postFormData.currentFiles).dataForServer;
            formData.append("title", postFormData.title);
            formData.append("description", postFormData.description);
            sendNewUserPost(formData);
        }
    };

    return (
        <FormContainer>
            <div className="field">
                <label htmlFor="addPostUserTitle">Заголовок</label>
                <input
                    id="addPostUserTitle"
                    type="text"
                    placeholder={t("Название поста")}
                    onChange={(e) => setPostFormData({ ...postFormData, title: e.target.value })}
                />
            </div>
            <div className="field">
                <input
                    id="addPostUserFiles"
                    ref={ref}
                    type="file"
                    accept=".png, .jpeg, .mp4, .mp3, .jpg"
                    multiple
                    onChange={(e) => setPostFormData({ ...postFormData, currentFiles: e.target.files })}
                    style={{ display: "none" }}
                />
                <label>Медиа</label>
                <a onClick={chooseFile} className="link">
                    <div>
                        {!isMobile$ ? t("Добавить изображение к публикации") : t("Добавить изображение")} 
                        ({postFormData.currentFiles?.length ? postFormData.currentFiles?.length : 0} / 5)
                    </div>
                </a>
            </div>
            <div className="field">
                <label htmlFor="addPostUserDescription">Описание</label>
                <textarea
                    id="addPostUserDescription"
                    placeholder={t("Введите описание к посту")}
                    onChange={(e) => setPostFormData({ ...postFormData, description: e.target.value })}
                />
                <CustomButton onClick={sendNewPost} text={t("Добавить")} />
            </div>
        </FormContainer>
    )
})