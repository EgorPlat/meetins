import React from "react";
import s from "./CustomLoader.module.scss";

export default function CustomLoader(props: {
    marginTop?: number,
    marginLeft?: number
}): JSX.Element  {
    return(
        <div className={s.customLoaderWrapper}>
            <div className={s.customLoader} style={{marginTop: props.marginTop, marginLeft: props.marginLeft}}>
            
            </div>
        </div>
    )
}