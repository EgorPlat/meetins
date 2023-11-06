import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { validateFilesFromInputAndStructuring } from "../../helpers/helper";
import { createNewPostInGroup } from "../../store/groups_model";
import FormContainer from "../../components/FormContainer/FormContainer";
 
export default function AddNewPostIntoGroupForm(props: { groupId: string }): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    const [selectedMediaContent, setSelectedMediaContent] = useState<any[]>([]);
    
    const onChangePost = (data: {name: string, description: string, media: File[]}) => {
        const mediaData = validateFilesFromInputAndStructuring(data.media);
        mediaData.dataForServer.append('name', data.name);
        mediaData.dataForServer.append('description', data.description);
        mediaData.dataForServer.append('groupId', props.groupId);

        for (let i = 0; i < mediaData.dataForClient.length; i++) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedMediaContent(prev => [...prev, reader.result]);
            }
            reader.readAsDataURL(mediaData.dataForClient[i]);
        }
        /*const reader = new FileReader();
        reader.onload = (event) => {
            fileBlob = event.target.result;
        };
        reader.readAsDataURL(el);*/

        //createNewPostInGroup(mediaData.dataForServer);
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangePost)}>
            <div>
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
                {errors.name ? <span>{errors.name.message}</span> : null}
            </div>
            <div>
                <label htmlFor="description">{t("Описание публикации")}</label>
                <textarea
                    id="description"
                    placeholder={t("Описание публикации")}
                    {...register("description", {required: false, validate: (value) =>
                    value.length === 0 ? "Нельзя оставить пустым" : true
                })}/>
                {errors.description ? <span>{errors.description.message}</span> : null}
            </div>
            <div>
                <label htmlFor="media">{t("Медиа-контент")}</label>
                <input
                    multiple
                    accept=".mp3,.ape,.jpg,.jpeg,.mp4,.png"
                    id="media"
                    type="file"
                    {...register("media", {required: false})} />
                {errors.media ? <span>{errors.media.message}</span> : null}
            </div>
            {
                selectedMediaContent.length > 0 &&
                <div>
                    {
                        selectedMediaContent.map(el => (
                            <img src={el} width="75px" height="75px" />
                        ))
                    }
                </div>
            }
            <button type="submit">{t("Добавить публикацию")}</button>
            </form>
        </FormContainer>
    )
}