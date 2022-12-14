import React from "react";
import s from "./ImageList.module.scss";
import { Post } from "../../../global/interfaces";
import { baseURL } from "../../../global/store/store";

export default function ImageList(props: {posts: Post[]}): JSX.Element {
    return(
        <div className={s.postsList}>
            {
              props.posts?.map(el => {
                const date = new Date(el.date);
                return (
                  <div className={`${s.post} ${s.block}`}>
                    <div className={s.postTitle}>
                      {el.title} <span className={s.date}>{date.getFullYear()}-{date.getMonth()}-{date.getDate() + 1}</span>
                    </div>
                    <div className={s.postImage}>
                      <img src={baseURL + el.images[0]} />
                    </div>
                    <div className={s.postDescription}>
                      {el.description}
                    </div>
                  </div>
                )
              })
            }
        </div>
    )
}