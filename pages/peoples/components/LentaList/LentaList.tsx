import React from "react";
import s from "./LentaList.module.scss";
import { IWall } from "../../../../global/interfaces/wall";
import { baseURL } from "../../../../global/store/store";
import CustomSlider from "../../../../components-ui/CustomSlider/CustomSlider";
import { AiOutlineLike } from "react-icons/ai";
import CustomEditMenu from "../../../../components-ui/CustomEditMenu/CustomEditMenu";
import { customizeDateToYYYYMMDDHHMMFormat } from "../../../../global/helpers/helper";

export default function LentaList(props: {
    wallPosts: IWall[],
    handleGoToLink: (isGroup: boolean, linkId: number) => void
}): JSX.Element {
    return(
        <div className={s.lentaList}>
            {
                props.wallPosts?.map(el => (
                    <div className={s.wallPost} key={el.postDescription}>
                        <div className={s.postAuthor}>
                            <img src={baseURL + el.avatar} className={s.avatar} />
                            <div className={s.name}>{el.name} - {el.postTitle}</div>
                        </div>
                        <div className={s.postContent}>
                            {
                                el.postFiles?.length > 0 &&
                                    <CustomSlider 
                                        files={
                                            el.postFiles.map(el => {
                                                return {
                                                    ...el,
                                                    src: baseURL + el.src
                                                }
                                            })
                                        } 
                                        width='350px' 
                                        height='300px' 
                                    />
                            }
                        </div>
                        <div className={s.postDescription}>
                            {el.postDescription}
                        </div>
                        <div className={s.postMoreInfo}>
                            <span>Понравилось: {el.postLikes.length} {/*<AiOutlineLike fontSize={20} />*/}</span>
                            <span className={s.postDate}>
                                Опубликовано: {customizeDateToYYYYMMDDHHMMFormat(el.postDate)}
                            </span>
                        </div>
                        <div className={s.postActions}>
                            <CustomEditMenu
                                data={[
                                    { 
                                        menuTitle: "Не получать уведомления", 
                                        menuFunction: () => console.log(2) 
                                    },
                                    { 
                                        menuTitle: "Перейти к источнику", 
                                        menuFunction: () => props.handleGoToLink(el.isGroup, el.linkId) 
                                    }
                                ]}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}