import React, { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { validateFilesFromInputAndStructuring } from "../../../shared/helpers/helper";
import { createNewPostInGroup } from "../../../global/store/groups_model";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";
import { isTypeOfFileAreNotVideoOrImageOrAudio } from "../../../shared/helpers/validate";

interface IAddNewPostIntoGroupForm {
    name: string, 
    description: string, 
    media: File[]
}

export default function AddNewPostIntoGroupForm(props: { 
    groupId: string,
    handleCloseModal: () => void
}): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<IAddNewPostIntoGroupForm>();
    const { t } = useTranslation();
    const [selectedMediaContent, setSelectedMediaContent] = useState<{ file: File, blob: string }[]>([]);
    
    const onChangePost = (data: IAddNewPostIntoGroupForm) => {
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
                <div className="field">
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
                <div className="field">
                    <label htmlFor="description">{t("Описание публикации")}</label>
                    <textarea
                        id="description"
                        placeholder={t("Описание публикации")}
                        {...register("description", { required: false, validate: (value) =>
                            value.length === 0 ? "Нельзя оставить пустым" : true
                        })}/>
                    {errors.description ? <span>{errors.description.message}</span> : null}
                </div>
                <div className="field">
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
                                        right: 0, 
                                        cursor: "pointer",
                                        fontWeight: 700,
                                        fontSize: "18px",
                                        backgroundColor: "var(--bg-color)",
                                        border: "1px solid gray",
                                        borderTopRightRadius: "5px",
                                        display: "flex",
                                        width: "20px",
                                        minHeight: "15px",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    onClick={() => handleRemoveImgFile(el.blob)}
                                >
                                    x
                                </div>
                                {
                                    isTypeOfFileAreNotVideoOrImageOrAudio(el.file.type) 
                                        ? <div 
                                            style={{
                                                border: "1px solid gray",
                                                borderRadius: "5px",
                                                padding: "3px",
                                                width: "75px", 
                                                height: "75px", 
                                                fontSize: "12px",
                                                wordBreak: "break-all",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis"
                                            }}>{el.file.name}</div>
                                        : <img 
                                            src={el.blob} 
                                            width="75px" 
                                            height="75px"
                                            style={{ borderRadius: "5px" }}
                                        />
                                }
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