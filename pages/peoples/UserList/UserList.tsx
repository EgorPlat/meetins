import { useRouter } from "next/router";
import React from "react";
import { IPeople } from "../../../global/store/peoples_model";
import { baseURL } from "../../../global/store/store";
import s from "./UserList.module.scss";

export default function UserList(props: {user: IPeople}): JSX.Element {

    const router = useRouter();

    const goToProfile = (user: IPeople) => {
        //router.push(`profile/${user.loginUrl}`)
    }
    return( 
        <div className={s.user} onClick={() => goToProfile(props.user)}>
            <div className={s.image} style={{backgroundImage: `url(${baseURL + props.user?.userAvatar})`}}>
                <div className={s.round}>
                        
                </div>
            </div>
            <div className={s.name}>
                <h5>{props.user?.userName}</h5>
            </div>
        </div>
    )
}