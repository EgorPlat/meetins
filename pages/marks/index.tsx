import React from "react";
import LeftNavMenu from "../../global/LeftNavMenu/LeftNavMenu";
import s from "./marks.module.scss";

export default function Marks(): JSX.Element {
    return(
        <div className={s.marks}>
           <div className={s.menu}>
               <LeftNavMenu />
           </div>
           <div className={s.content}>
               <div className={s.types}>
                   <button>Все</button>
                   <button>Люди</button>
                   <button>События</button>
               </div>
               <div className={s.result}>
               
               </div>
           </div>
        </div>
    )
}