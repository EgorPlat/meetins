import React from "react";
import s from "./LentaList.module.scss";
import { IWall } from "../../../../global/interfaces/wall";
import { baseURL } from "../../../../global/store/store";
import CustomSlider from "../../../../components-ui/CustomSlider/CustomSlider";
import { FcLike } from "react-icons/fc";
import CustomEditMenu from "../../../../components-ui/CustomEditMenu/CustomEditMenu";
import { customizeDateToYYYYMMDDHHMMFormat } from "../../../../global/helpers/helper";
import { CiHeart } from "react-icons/ci";

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
                            <div className={s.name}>
                                {el.isGroup && "Сообщество: "}
                                {el.name} - {el.postTitle}
                                </div>
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
                            <div className={s.postLikes}>{<CiHeart fontSize={26} />}{el.postLikes.length}</div>
                            <div className={s.postDate}>
                                Опубликовано: {customizeDateToYYYYMMDDHHMMFormat(el.postDate)}
                            </div>
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