import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { validateFilesFromInputAndStructuring } from "../../helpers/helper";
import { createNewPostInGroup } from "../../store/groups_model";
import FormContainer from "../../components/FormContainer/FormContainer";
import CustomButton from "../../components-ui/CustomButton/CustomButton";
 
export default function AddNewPostIntoGroupForm(props: { 
    groupId: string,
    handleCloseModal: () => void
}): JSX.Element {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const { t } = useTranslation();
    const [selectedMediaContent, setSelectedMediaContent] = useState<{ file: File, blob: string }[]>([]);
    
    const onChangePost = (data: {name: string, description: string, media: File[]}) => {
        const filesFromInput = selectedMediaContent.map(el => { 
            return el.file;
        });
        const mediaData = validateFilesFromInputAndStructuring(filesFromInput);
        mediaData.dataForServer.append("name", data.name);
        mediaData.dataForServer.append("description", data.description);
        mediaData.dataForServer.append("groupId", props.groupId);
        createNewPostInGroup(mediaData.dataForServer);
        props.handleCloseModal();
    };

    const onFileChanges = (files: FileList) => {
        let mediaContent = []; 
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function () {
                mediaContent = [...mediaContent, { file: files[i], blob: reader.result }];
                setSelectedMediaContent(mediaContent)
            }
            reader.readAsDataURL(files[i]);
        }
    };

    const handleRemoveImgFile = (blob: string) => {
        setSelectedMediaContent(prev => prev.filter(el => el.blob !== blob));
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangePost)}>
                <div>
                    <label htmlFor="name">{t("Заголовок")}</label>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="Заголовок" 
                        {...register("name", {
                            required: false, 
                            validate: (value) => 
                                value.length >= 20 || value.length <= 5
                                    ? "Не менее 5-ти и не более 20-ти символов"
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
                        accept=".mp3,.ape,.jpg,.jpeg,.mp4,.png,.doc,.docx,.zip,.rar,.pdf"
                        id="media"
                        type="file"
                        style={{ color: "transparent" }}
                        {...register("media", {
                            required: false,
                            onChange: (e) => onFileChanges(e.target.files)
                        })} />
                    {errors.media ? <span>{errors.media.message}</span> : null}
                </div>
                {
                    selectedMediaContent.length > 0 &&
                <div style={{ display: "flex", columnGap: "5px" }}>
                    {
                        selectedMediaContent.map(el => (
                            <div key={el.blob} style={{ position: "relative" }}>
                                <div 
                                    style={{ 
                                        position: "absolute", 
                                        top: 0, 
                                        right: 5, 
                                        color: "red", 
                                        cursor: "pointer",
                                        height: "15px",
                                        fontWeight: 700,
                                        fontSize: "18px"
                                    }}
                                    onClick={() => handleRemoveImgFile(el.blob)}
                                >
                                    <div>x</div>
                                </div>
                                <img 
                                    src={el.blob} 
                                    width="75px" 
                                    height="75px"
                                    style={{ borderRadius: "5px" }}
                                />
                            </div>
                        ))
                    }
                </div>
                }
                <CustomButton type="submit" text={t("Добавить публикацию")} />
            </form>
        </FormContainer>
    )
}