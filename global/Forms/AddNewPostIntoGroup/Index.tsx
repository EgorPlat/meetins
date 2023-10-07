import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import s from "./addNewPostIntoGroupForm.module.scss";
import { validateFilesFromInputAndStructuring } from "../../helpers/helper";
import { createNewPostInGroup } from "../../store/groups_model";
 
export default function AddNewPostIntoGroupForm(props: { groupId: string }): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    const [selectedMediaContent, setSelectedMediaContent] = useState();
    
    const onChangePost = (data: {name: string, description: string, media: File[]}) => {
        const mediaData = validateFilesFromInputAndStructuring(data.media);
        mediaData.dataForServer.append('name', data.name);
        mediaData.dataForServer.append('description', data.description);
        mediaData.dataForServer.append('groupId', props.groupId);
        
        
        /*const reader = new FileReader();
        reader.onload = (event) => {
            fileBlob = event.target.result;
        };
        reader.readAsDataURL(el);*/

        createNewPostInGroup(mediaData.dataForServer);
    }
    return (
        <div className={s.info}>
            <form onSubmit={handleSubmit(onChangePost)}>
            <div className={s.formElem}>
                <label htmlFor="name">{t("Заголовок")}</label>
                <input 
                    type="text" 
                    id="name"
                    placeholder="Заголовок" 
                    {...register("name", {required: false, validate: (value) => 
			            value.length >= 20 || value.length <= 5
				        ? 'Не менее 5-ти и не более 20-ти символов'
				        : true,
                    })}
                />
                {errors.name ? <span className={s.spanError}>{errors.name.message}</span> : null}
            </div>
            <div className={s.formElem}>
                <label htmlFor="description">{t("Описание публикации")}</label>
                <textarea
                    id="description"
                    placeholder={t("Описание публикации")}
                    {...register("description", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.description ? <span className={s.spanError}>{errors.description.message}</span> : null}
            </div>
            <div className={s.formElem}>
                <label htmlFor="media">{t("Медиа-контент")}</label>
                <input
                    multiple
                    accept=".mp3,.ape,.jpg,.jpeg,.mp4,.png"
                    id="media"
                    type="file"
                    placeholder={t("Краткое описание композиции")}
                    {...register("media", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.media ? <span className={s.spanError}>{errors.media.message}</span> : null}
            </div>
            <button type="submit" className={s.saveButton}>{t("Добавить композицию")}</button>
            </form>
        </div>
    )
}