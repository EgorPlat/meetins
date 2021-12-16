import React from "react";
import s from "./ImageList.module.scss";
import Image from "next/image";

export default function ImageList(props: {images: string[]}): JSX.Element {
    return(
        <div className={s.imageList}>
            <div className={s.image}>
                { props.images !== undefined ? 
                  props.images.map((elem, index) => 
                    <Image key={elem} src={elem} width={300} height={300} alt={`Фото профиля номер ${index}`}/>
                  ) &&
                   props.images.length === 0 ? <h3>Фото пока что нет.</h3>  : null
                  : null 
                }
            </div>
        </div>
    )
}