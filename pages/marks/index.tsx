import React from "react";
import PageContainer from "../../components/pageContainer/pageContainer";
import s from "./marks.module.scss";

export default function Marks(): JSX.Element {
    return(
        <PageContainer>
            <div className={s.content}>
            <div className={s.types}>
                   <button>Все</button>
                   <button>Люди</button>
                   <button>События</button>
            </div>
            <div className={s.result}>
               
            </div>
            </div>
        </PageContainer>
    )
}