import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormContainer from "../../../widgets/FormContainer/FormContainer";
import { addNotification } from "../../../global/store/notifications_model";
import { addNewMusic, currentAuthorName, getAuthorCurrentName } from "../../../global/store/music_model";
import { validateFilesFromInputAndStructuring } from "../../../shared/helpers/helper";
import { useUnit } from "effector-react";
import CustomButton from "../../../shared/ui/CustomButton/CustomButton";

export default function AddMusic(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();
    const currentAuthorName$ = useUnit(currentAuthorName);

    const onChangeMusic = (data: {
        name: string,
        composition: File[],
        description: string,
        title: string
    }) => {
        if (
            data.composition.length > 2 ||
            data.composition.length < 2
        ) {
            addNotification({
                type: "error",
                text: t("Вы должны загрузить 2 файла: картинку и звуковую дорожку"),
                textColor: "white",
                time: 3000
            });
        } else {
            if (
                (data.composition[0].type.includes("image") && data.composition[1].type.includes("audio")) ||
                (data.composition[1].type.includes("image") && data.composition[0].type.includes("audio"))
            ) {
                const musicMedia = validateFilesFromInputAndStructuring(data.composition);

                musicMedia.dataForServer.append("name", data.name);
                musicMedia.dataForServer.append("description", data.description);
                musicMedia.dataForServer.append("title", data.title);
                addNewMusic(musicMedia.dataForServer);
            } else {
                addNotification({
                    type: "error",
                    text: t("Вы должны загрузить 2 файла: картинку и звуковую дорожку"),
                    textColor: "white",
                    time: 3000
                });
            }
        }
    };

    useEffect(() => {
        getAuthorCurrentName();
    }, []);

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onChangeMusic)}>
                <div>
                    <label htmlFor="name">
                        {t("Псевдоним автора")}
                    </label>
                    <input
                        type="text"
                        id="name"
                        defaultValue={currentAuthorName$}
                        placeholder={t("Псевдоним автора")}
                        {...register("name", {
                            required: false, validate: (value) =>
                                value.length >= 25 || value.length <= 5
                                    ? t("Не менее 5-ти и не более 25-ти символов")
                                    : true,
                        })}
                    />
                    {errors.name ? <span>{errors.name.message}</span> : null}
                </div>
                <div>
                    <label htmlFor="description">{t("Краткое описание композиции")}</label>
                    <textarea
                        id="description"
                        placeholder={t("Краткое описание композиции")}
                        {...register("description", {
                            required: false, validate: (value) =>
                                value.length === 0 ? t("Нельзя оставить пустым") : true
                        })} />
                    {errors.description ? <span>{errors.description.message}</span> : null}
                </div>
                <div>
                    <label htmlFor="title">{t("Название композиции")}</label>
                    <input
                        type="text"
                        id="title"
                        placeholder={t("Название композиции")}
                        {...register("title", {
                            required: false, validate: (value) =>
                                value.length >= 20 || value.length <= 5
                                    ? t("Не менее 5-ти и не более 20-ти символов")
                                    : true,
                        })}
                    />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </div>
                <div>
                    <label htmlFor="composition">{t("Файлы композиции (1 картинка и 1 звуковая дорожка)")}</label>
                    <input
                        accept=".mp3,.ape,.png,.jpg,.jpeg"
                        id="composition"
                        type="file"
                        multiple
                        max={2}
                        placeholder={t("Краткое описание композиции")}
                        {...register("composition", {
                            required: false, validate: (value) =>
                                value.length === 0 ? t("Нельзя оставить пустым") : true
                        })} />
                    {errors.composition ? <span>{errors.composition.message}</span> : null}
                </div>
                <CustomButton type="submit" text={t("Добавить композицию")} />
            </form>
        </FormContainer>
    )
}